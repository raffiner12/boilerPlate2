import axios from 'axios';
import { LOGIN_USER } from './types'
export function loginUser(dataToSubmit) { // dispatch(body)의 body부분을 파라미터 dataToSubmit으로 만들어줌.

    // 서버에 보낼 때는 Axios 사용
    const request = axios.post('/api/users/login', dataToSubmit)
        // response를 받아 처리할 것을 해줌.
        .then(response => response.data ) // 서버에서 받은 데이터를 request에 저장

    // return을 시켜 reducer로 보냄.
    return {
        type: "LOGIN_USER", payload: request
    }
    
}