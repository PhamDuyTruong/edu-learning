import {FETCH_USER_DETAIL_SUCCESS, FETCH_USER_DETAIL_LOADING, FETCH_USER_DETAIL_FAIL} from "../constants/UserDetailConstant";
import userAPI from "../services/authAPI";


export const fetchUserDetail = () =>{
    return async (dispatch) =>{
        dispatch({type: FETCH_USER_DETAIL_LOADING})
        const user = JSON.parse(localStorage.getItem("user"))
        const userData = {
            taiKhoan: user.taiKhoan
        }
        try{
            const {data} = await userAPI.fetchUserDetail(userData);
            dispatch({type: FETCH_USER_DETAIL_SUCCESS, payload: {data}})
        }catch(e){
            dispatch({
                type: FETCH_USER_DETAIL_FAIL
            })
        }
    }
}

