import React, { useEffect } from 'react'
import axios from 'axios';

function LandingPage() {

  useEffect(() => {
    axios.get('/api/hello') // endPoint를 서버로 우리가 보냄 -> server/index.js
    .then(response => console.log(response.data)) //콘솔로 받은 메시지 출력
  }, [])
  
  return (
    <div>
      LandingPage 랜딩페이지
    </div>
  )
}

export default LandingPage