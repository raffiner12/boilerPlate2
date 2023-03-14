const express = require('express') // express 모듈을 가져옴
const app = express()
const port = 5000


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://noncelabLena:1234*@cluster0.ry13cak.mongodb.net/?retryWrites=true&w=majority ',{
    useNewUrlParser: true, useUnifiedTopology:true // 에러 안뜨게 써주는 것. 몽구스 6버전 이상은 usenewparser,topology, createindex, findandmodify 삭제
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!~~ 안녕하세요')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})  