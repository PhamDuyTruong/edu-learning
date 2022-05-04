import {FETCH_USER_DETAIL_SUCCESS, FETCH_USER_DETAIL_LOADING, FETCH_USER_DETAIL_FAIL} from "../constants/UserDetailConstant";
import axios from '../services/axios'

  
  export const fetchUserDetailSuccess = (userDetail) => {
    return {
      type: FETCH_USER_DETAIL_SUCCESS,
      userDetail: userDetail,
    };
  };
  
  export const fetchUserDetailFail = (error) => {
    return {
      type: FETCH_USER_DETAIL_FAIL,
      error: error,
    };
  };
  
  export const fetchUserDetail = () => {
    return (dispatch) => {
      dispatch({type: FETCH_USER_DETAIL_LOADING});
      const user = JSON.parse(localStorage.getItem("user"));
      const url = "/QuanLyNguoiDung/ThongTinTaiKhoan";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };
      const data = {
        taiKhoan: user.taiKhoan,
      };
  
      axios({ method: "post", url, headers, data })
        .then((response) => {
          dispatch(fetchUserDetailSuccess(response.data));
        })
        .catch((error) => {
          dispatch(fetchUserDetailFail(error));
        });
    };
  };


