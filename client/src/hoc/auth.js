import React, {useEffect} from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

// Auth 익명함수
//export default function (SpecificComponent, option, adminRoute = null) {
    // 그 사람의 상태를 먼저 가져옴.
    // 백엔드에 이미 만들어둔 auth API 있음

    /*
    옵션 : null, true, false
    null - 아무나 출입 가능한 페이지
    true - 로그인한 유저만 출입 가능한 페이지
    */

//     function AuthenticationCheck(props) {
//         const dispatch = useDispatch();
//         const navigate = useNavigate();
//         React.useEffect(() => {
//             // redux 사용
//             // action이름을 auth라고 정의
//             dispatch(auth()).then(response => {
//                 console.log(response)
//                 // 로그인하지 않은 상태
//                 if(!response.payload.isAuth) {
//                     // login yet
//                     if(option){
//                         navigate("/login");
//                     }
//                 }else {
//                     // 로그인 한 상태
//                     if(adminRoute && !response.payload.isAdmin) {
//                         navigate("/")
//                     } else {
//                         if (option === false ) {
//                         // 로그인한 유저가 출입 불가능한 페이지를 가려 할 때 ( 예) 로그인 페이지, 회원 가입 페이지)
//                         navigate('/')
//                         }
//                     }   
//                 }
//             });
//         }, []);
//         return (
//             <SpecificComponent /> // component return이 없으면 React 실행이 안 됨.
//         );
//     }  

//     return <AuthenticationCheck />;
// }

// Auth 기명함수
const Auth = (SpecificComponent, option, adminRoute = null) => {

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            // redux 사용
            // action이름을 auth라고 정의
            dispatch(auth()).then((res) => {
                console.log(res);
            });
        }, [] );

        return <SpecificComponent />;
    }
    return AuthenticationCheck;
};
export default Auth;