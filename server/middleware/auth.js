const { User } = require('../models/User');  

let auth = (req, res, next) => {
    
//  인증 처리를 하는 곳

//  클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
//  토큰을 복호화한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {   // findByToken 메소드를 User 모델에서 만듦. (User.js)
        if (err) throw err;
        // 클라이언트에 유저가 없으면
        if (!user) return res.json({ isAuth: false, error: true })
        // 유저가 있으면
        // 토큰과 유저를 req에 넣어줌으로 인해 index.js에서 사용할 수 있다.
        req.token = token; // 토큰 넣어주고,
        req.user = user;  // 정보도 넣어주고
        // 미들웨어에서 다음 단계로 갈 수 있게.
        next(); 
    })
//  유저가 있으면 인증 Okay    
//  유저가 없으면 인증 No!
}   

// auth를 다른 파일에서도 쓸 수 있게
module.exports = { auth };