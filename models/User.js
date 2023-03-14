const mongoose = require('mongoose');

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

// 스키마를 모델로 감싸줌
const User = mongoose.model('User', userSchema) // model('모델이름', 스키마)

// 모델(User)을 다른 파일에서 쓸 수 있도록 exports 해줌
module.exports = { User }