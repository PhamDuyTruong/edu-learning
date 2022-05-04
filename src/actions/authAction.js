import {AUTH_LOADING, AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT, CHOOSE_GROUP} from '../constants/authConstant';
import authAPI from "../services/authAPI";


export const authStart = () => {
  return {
    type: AUTH_LOADING,
  };
};

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
           taiKhoan: value.username,
           matKhau: value.password
       }
       if(isSignup){
           authData = {
            taiKhoan: value.username,
            matKhau: value.password,
            hoTen: value.name,
            soDT: value.phone,
            maNhom: value.group,
            email: value.email,
           }
       }
      try{
        if(isSignup){
            const {data} = await authAPI.register(authData);
            dispatch(authSuccess(data, "Sign up successfully !!!"))
            //console.log("data", data);
            history.push("/sign-in")
        }
        else{
            const {data} = await authAPI.login(authData);
            dispatch(authSuccess(data, "Log in successfully !!!"));
            localStorage.setItem("user", JSON.stringify(data));
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

  export const chooseGroup = (group) => {
    return {
      type: CHOOSE_GROUP,
      group: group,
    };
  };