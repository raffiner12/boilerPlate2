import {
    LOGIN_USER, REGISTER_USER, AUTH_USER
} from '../_actions/types'

export default function (state = {}, action) { // 현재 state은 비어있는 상태
    // 다른 type이 올 때마다 다른 조치를 취해줘야함 -> Switch 문법 사용
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;
        case AUTH_USER:
            return { ...state, userData: action.payload }
            break;
        default: 
            return state;
    }
}