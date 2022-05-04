import {AUTH_FAILED, AUTH_LOGOUT, AUTH_LOADING, AUTH_SUCCESS, CHOOSE_GROUP} from '../constants/authConstant';

const initialState = {
    token: null,
    success: null, 
    error: null,
    loading: false,
    accountName: null,
    authRedirectPath: "/",
    group: "GP08",
}

function getAuth(state = initialState, action){
     switch(action.type){
         case AUTH_LOADING:
             return {...state, error: null, success: null, loading: true}
         case AUTH_SUCCESS:
             return {...state, token: action.payload.authData.accessToken, accountName: action.payload.authData.taiKhoan, error: null, loading: false, success: action.message}
         case AUTH_FAILED:
             return {...state, loading: false, success: null}
         case AUTH_LOGOUT:
              return {...state, token: null}
        case CHOOSE_GROUP:
            return {...state, group: action.group}
        default: 
           return state;
    }
}

export default getAuth;