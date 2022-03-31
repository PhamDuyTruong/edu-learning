import {AUTH_LOADING, AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT} from '../constants/authConstant';
import authAPI from "../services/authAPI"

export const authSuccess = (authData, message) => {
    return {
      type: AUTH_SUCCESS,
      payload: {authData},
      message: message,
    };
  };

export const auth = (value, history, isSignup) =>{
   return async (dispatch) =>{
       dispatch({type: AUTH_LOADING});
       let authData = {
           username: value.username,
           password: value.password
       }
       if(isSignup){
           authData = {
               username: value.username,
               password: value.password,
               name: value.name,
               phone: value.phone,
               groupKey: value.group,
               email: value.email
           }
       }
      try{
        if(isSignup){
            const {data} = authAPI.register(authData);
            dispatch(authSuccess(data, "Sign up successfully !!!"))
            history.push("/sign-in")
        }
        else{
            const {dataLogin} = authAPI.login(authData);
            dispatch(authSuccess(dataLogin, "Log in successfully !!!"));
            localStorage.setItem("user", JSON.stringify(dataLogin));
            history.push("/") 
        }
      } catch(e){
          dispatch({
              type: AUTH_FAILED
          })
      }

   }
};

export const Logout = () =>{
   localStorage.removeItem("user");
   return {
       type: AUTH_LOGOUT
   }
}

export const authCheckState = () => {
    return (dispatch) => {
      const user = localStorage.getItem("user");
      if (!user) {
        dispatch(Logout());
      } else {
        dispatch(authSuccess("user"));
      }
    };
  };