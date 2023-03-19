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
                
            })
        

        }, [])
    }  
    return AuthenticationCheck
}