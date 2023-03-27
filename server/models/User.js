const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    // 유저와 관련된 것 작성
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 빈 칸을 없애주는 역할을 trim이 함.
        unique: 1   // 똑같은 이메일은 쓰지 못하도록
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// 몽구스에서 가져온 메소드 pre()
// 유저 모델에 유저 정보를 저장하기 전에 함수를 줘서 뭔가 한다는 것. 다 끝나면 index.js save로 돌아감.
// 할 걸 다하면 next() 로 보내버림.
userSchema.pre('save', function(next){
    
    var user = this; // this가 유저스키마 내용을 가르킴.

    // 비밀번호를 바꿀 때만 다시 비밀번호를 암호화 하도록 조건을 걸어줌
    if(user.isModified('password')) {

        // 비밀 번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            // salt를 제대로 생성했다면
                // pw를 hash로 교체 (순수한 비밀번호, salt)
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                // 암호화된 비밀번호를 만드는데 성공했다면
                user.password = hash
                // 완성이 됐으면 돌아가야지 (index.js로)
                next()
            })
        });
    // 비밀 번호를 바꾸는게 아닌 다른 걸 바꿀 때는 바로 next
    } else { 
        next()
    }
})

//-------------------------------------------------------------------------------

// 로그인 기능 comparePassword 메소드 만들기

userSchema.methods.comparePassword = function(plainPassword, cb) {
 
    // plainPassword 1234567  <-  같은지 체크  ->  암호화된 비밀번호 $2g45@F#$G43g34g3~~
    // 복호화는 안되기 때문에 순수비번을 암호화해서 같은지 체크해야함.
                // (순수 비밀번호, 암호화된 비밀번호, 콜백함수(에러, true))
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) { // this가 70번 줄의 userSchema를 가르킴
        if(err) return cb(err);
            // 콜백 (에러는 없고, true)
            cb(null, isMatch) ;
    })
}


// 토큰 발행

userSchema.methods.generateToken = function(cb) {

    var user = this;
    
    // jsonwebtoken을 이용해서 token을 생성하기
    // user._id + secretToken = token
    // -> 후에 token 해석할 때 secretToken 넣으면 -> user._id 가 나옴  =>  token을 가지고  user._id가 누군지 알 수 있는 것.
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save().then((user) => {
        return cb(null, user)

        // 만약 에러가 있다면 콜백으로 에러를 전달
       // if(err) return cb(err)
        // save가 잘 됐다면 에러는 없고, user 정보만 전달
        //cb(null, user)
    }).catch((err) => {
        res.cb(err)
    })
    
}

//-------------------------------------------------------------------------------

// Auth

userSchema.statics.findByToken = function( token, cb) {
    var user = this;

//  토큰을 decode한다.    
    jwt.verify(token, 'secretToken', function(err, decoded) { // decoded된 것은 userId

        // 유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인   
        user.findOne({"_id": decoded, "token": token })
        .then((user) =>{
            return cb(null, user)
            // 에러가 있다면 콜백으로 에러 전달
            //if(err) return cb(err)
            // 만약 에러가 없다면 user 정보를 전달
            //cb(null, user)
        })
        .catch(err => {
            return cb(err)

        })
    })
}
//-------------------------------------------------------------------------------


// 스키마를 모델로 감싸줌
const User = mongoose.model('User', userSchema) // model('모델이름', 스키마)

// 모델(User)을 다른 파일에서 쓸 수 있도록 exports 해줌
module.exports = { User }