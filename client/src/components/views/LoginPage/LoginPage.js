import React, { useState } from 'react'
// import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // value부분에 state을 넣어줘야 한다. -> useState 사용
  const [Email, setEmail] = useState("") // Email이 처음엔 빈 칸
  const [Password,setPassword] = useState("")


  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value) // setEmail을 이용해 state를 바꿔줄 수 있다
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); // 페이지가 새로고침되면 해야할 일을 못한다.

    console.log('Email : ', Email)
    console.log('Password : ', Password)

    let body = {
      email: Email,  
      password: Password
    }

    // dispatch를 이용해 ACTION을 취함. (ACTION이름 : loginUser)
    dispatch(loginUser(body))
      // 로그인 성공시 랜딩페이지로 이동 
      .then(response => {
        if(response.payload.loginSuccess) {
          //props.history.push('/')
          navigate("/")
        } else {
          alert('Error')
        }
      })

    
  }

  return (
    <div style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                    width: '100%', height: '100vh' 
    }}>
      <form style = {{ display:'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br/>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage