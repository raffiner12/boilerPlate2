import React, { useEffect } from 'react'
import axios from 'axios';

function LandingPage(props) {

  useEffect(() => {
    axios.get('/api/hello') // endPoint를 서버로 우리가 보냄 -> server/index.js
    .then(response => console.log(response)) //콘솔로 받은 메시지 출력
  }, [])
  
  onClickHandler = () => {
    axios.get('/api/users/logout')
      .then(response => {
        if(response.data.success){
          props.history.push("/login")
        } else {
          alert('로그아웃 하는데 실패했습니다.')
        }
      })
  }

  return (
    <div style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                    width: '100%', height: '100vh' 
    }}>
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>
        로그아웃
      </button>
    </div>
  )
}

export default LandingPage