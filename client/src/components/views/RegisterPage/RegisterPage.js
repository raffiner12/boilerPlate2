import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("") // Email이 처음엔 빈 칸
  const [Password,setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")


  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value) // setEmail을 이용해 state를 바꿔줄 수 있다
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); // 페이지가 새로고침되면 해야할 일을 못한다.
    
    // 비밀번호 확인 체크
    if(Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }

    let body = {
      email: Email,
      password: Password,
      name: Name
    }

    // dispatch를 이용해 ACTION을 취함. (ACTION이름 : registerUser)
    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success) {
          props.history.push("/login")
        } else {
          alert("Failed to sign up")
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

        <label>Name</label>
        <input type="email" value={Name} onChange={onNameHandler} />

        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br/>
        <button>
          회원 가입
        </button>
      </form>
    </div>
  )
}

export default RegisterPage