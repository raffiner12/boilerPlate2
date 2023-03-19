import React, {useEffect} from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {

            // redux 사용
            // action이름을 auth라고 정의
            dispatchEvent(auth()).then(response => {

                // 로그인하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option){
                        props.history.push('/login')
                    }

                }else {
                    // 로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    } else {
                        // 로그인한 유저가 출입 불가능한 페이지를 가려 할 때 ( 예) 로그인 페이지, 회원 가입 페이지)
                        props.history.push('/')
                    }
                }
            })
        }, [])
        return (
            <SpecificComponent />
        )
    }  
    return AuthenticationCheck
}