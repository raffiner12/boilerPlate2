const express = require('express') // express 모듈을 가져옴
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const config = require('./config/key');
const { auth } = require('./middleware/auth')
const { User } = require("./models/User");

  
// bodyParser 옵션을 좀 준다.
// application/x-ww-form-urlencoded <- 이렇게 된 데이터를 분석해서 가져올 수 있게 해준다.
app.use(bodyParser.urlencoded({extended: true}));

// application/json 타입으로 된 것을 분석해서 가져올 수 있게 해준다.
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
  useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify: false // 에러 안뜨게 써주는 것. 몽구스 6버전 이상은 usenewparser,topology, createindex, findandmodify 삭제
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


// get 메소드 
app.get('/', (req, res) => { res.send('Hello World!~~ 안녕하세요')})

// 랜딩페이지의 request를 받는 라우트를 만듦
app.get('/api/hello', (req,res) => {
  res.send("안녕하세요 ~") // 프론트에 메시지 전달(응답)
})


//-------------------------------------------------------------------------------

// 회원가입을 위한 Register Route 만들기 


// post 메소드 이용
//    ('라우트 end포인트', (콜백 함수))
app.post('/api/users/register', async (req, res) => {
  
  // 회원 가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다. -> 모델 폴더의 User.js 가져와야함.
  // User를 가져와 이걸로 인스턴스 만듦
  // bodyParser의 정보들을 데이터 베이스에 넣기 위해서는 (req.body) 해줌.
  // req.body 안에는 json 형식으로 들어있는데, 들어있을 수 있게 해주는 것은 bodyParser가 있어서임.
  // bodyParser를 이용해서 req.body로 client에서 보내는 정보를 받아준다. 
  const user = new User(req.body);

  // 몽구스6부터 콜백 허용 안됨.
      // user를 이용해서 몽고DB에서 오는 메소드 .save를 해줌.
      // user.save((err, userInfo) => {
        // 저장할 때 에러가 있다면 ('성공하지 못했다'고 에러 메세지와 함께 )json형식으로 전달
      //   if(err) return res.json({ success: false, err})
      //   //성공했다면(200) json 형식으로 정보를 전달
      //   return res.status(200).json({
      //     success: true
      //   })
      // })
  const result = await user.save().then(() => {
    res.status(200).json({
      success: true
    })
  }).catch((err) => {
    return res.json({ success: false, err})
  })
})

//-------------------------------------------------------------------------------

// 로그인을 위한 login route 만들기

// post메소드를 사용함.
app.post('/api/users/login', (req, res) => {

// 1. 요청된 이메일을 데이터베이스에서 있는지 찾는다 (이메일로 로그인)
  // 몽구스 50.부터는 콜백함수를 지원X
    // User모델을 가져와 findOne이란 몽고DB 메소드 이용
    // User.findOne({ email: req.body.email } (err, user) => {
    //   // 이 email을 가진 유저가 한 명도 없다면
    //   if(!user) {
    //     return res.json({
    //       loginSuccess : false,
    //       message: "제공된 이메일에 해당하는 유저가 없습니다."
    //     })
    //   }
  User.findOne({email: req.body.email})
  .then(docs=>{
    if(!docs){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

// 2. 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
                      //(요청할 때 주는 비번,(에러, 비번 비교해서 맞다)
    docs.comparePassword(req.body.password, (err, isMatch) => { // 메소드를 User 모델에서 만듦. (User.js)
      if(!isMatch)
      return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

// 3. 비밀 번호까지 맞다면 토큰을 생성하기.
      docs.generateToken((err, user) => { // 메소드를 User 모델에서 만듦. (User.js)
        // 에러가 있다면 에러메세지도 함께 전달
        if (err) return res.status(400).send(err);
        // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 등
        res.cookie("x_auth", user.token ) // x_auth라는 이름으로 쿠키가 들어감.
        // 성공
        .status(200)
        // json으로 데이터 보내줌.
        .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
  .catch((err)=>{
    return res.status(400).send(err);
  })
})

//-------------------------------------------------------------------------------

// Auth (신원 인증 기능)

app.get('/api/users/auth', auth, (req, res) => {  // middleware : 엔드포인트에 req 받은 다음 콜백 함수 하기 전 중간 단계 

//  아래 코드로 가려면 미들웨어까지 통과해야함.  
//  여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false :  true,  // 0이면 false(일반 유저), 아니면  true(관리자)
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
    // 이렇게 정보를 주면 어떤 페이지에 쓰는지 유저정보를 이용할 수 있어서 편해짐.
  }) 
})

//-------------------------------------------------------------------------------

// 로그아웃

app.get('/api/users/logout', auth, (req, res) => { // 로그인 된 상태니까 auth 넣어줌.
  User.findOneAndUpdate({_id: req.user._id},  // 유저 찾을 때는 Id로 찾음
  { token: "" } // 토큰 지워줌
  , (err, user) => {
    // 에러가 났다면
    if(err) return res.json({ success: false, err});
    // 성공했다면
    return res.status(200).send({
      success: true
    })
  })
})


//-------------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})  