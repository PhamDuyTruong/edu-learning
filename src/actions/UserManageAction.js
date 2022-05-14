import * as actionTypes from "../constants/UserManagerConstant";
import ManageUserAPI from '../services/ManageUserAPI';
import axios from '../services/axios'

export const fetchInfoClick = (selectedUser, tabIndex, avatarIndex) => {
  return {
    type: actionTypes.FETCH_INFO_CLICK,
    tabIndex: tabIndex && Math.abs(tabIndex) !== 1 ? -tabIndex : 2,
    isEdit: false,
    selectedUser: selectedUser,
    avatarIndex: avatarIndex,
  };
};

export const editUserClick = (selectedUser, tabIndex) => {
  return {
    type: actionTypes.EDIT_USER_CLICK,
    tabIndex: tabIndex && Math.abs(tabIndex) !== 2 ? -tabIndex : 1,
    isEdit: true,
    selectedUser: selectedUser,
  };
};

export const addUserClick = () => {
  return {
    type: actionTypes.ADD_USER_CLICK,
    tabIndex: -1,
    isEdit: false,
  };
};

  export const fetchUser = (group) =>{
      return async (dispatch) =>{
          dispatch({type: actionTypes.FETCH_USERS_START});
          try{
          const {data} = await ManageUserAPI.onFetchUser(group);
          dispatch({type: actionTypes.FETCH_USERS_SUCCESS, payload: {data}})
      }catch(e){
          dispatch({type: actionTypes.FETCH_USERS_FAIL})
      }
    }
  }

  export const fetchCourseApprovalPendingSuccess = (success, selectedUser) => {
    return {
      type: actionTypes.FETCH_COURSE_APPROVAL_PENDING_SUCCESS,
      success: success,
      selectedUser: selectedUser,
    };
  };

  export const fetchCourseApprovalPending = (selectedUser) =>{
      return async (dispatch) =>{
          dispatch({type: actionTypes.FETCH_COURSE_APPROVAL_PENDING_START});
          const user = JSON.parse(localStorage.getItem("user"));
          const url = "/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet";
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          };
          const userData = {
            taiKhoan: selectedUser.taiKhoan,
          };
          axios({ method: "post", url, headers, userData })
          .then((response) => {
         dispatch(
          fetchCourseApprovalPendingSuccess(response.data, selectedUser)
          );
      }).catch((e) => {
          dispatch({type: actionTypes.FETCH_COURSE_APPROVAL_PENDING_FAIL})
      })
    }
  }

  export const deleteUser = (selectedUser, group) =>{
      return async (dispatch) =>{
          dispatch({type: actionTypes.DELETE_USER_START});
          const user = JSON.parse(localStorage.getItem("user"));
          const url = `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${selectedUser.taiKhoan}`;
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          };
          axios({ method: "delete", url, headers })
          .then((response) => {
            dispatch({type: actionTypes.DELETE_USER_SUCCESS, payload: response.data});
            dispatch(fetchUser(group));
          })
          .catch((e) => {
            dispatch({type: actionTypes.DELETE_USER_FAIL});
          });
      }
  }

  export const addUserSuccess = (success) => {
    return {
      type: actionTypes.ADD_USER_SUCCESS,
      success: success,
    };
  };

  export const addUser = (values, isEdit, tabIndex, group) =>{
      return async (dispatch) =>{
          dispatch({type: actionTypes.ADD_USER_START});
          const user = JSON.parse(localStorage.getItem("user"));

          let method = "post";
          let url = "/QuanLyNguoiDung/ThemNguoiDung";
          if (isEdit) {
            method = "put";
            url = "/QuanLyNguoiDung/CapNhatThongTinNguoiDung";
          }
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          };
          const data = {
            taiKhoan: values.username,
            matKhau: values.password,
            hoTen: values.name,
            soDT: values.phone,
            maNhom: values.group,
            email: values.email,
            maLoaiNguoiDung: values.accountType,
          };
          axios({ method, url, headers, data })
            .then((response) => {
              if (isEdit) {
                dispatch(
                  addUserSuccess(
                    `Cập nhật tài khoản ${response.data.taiKhoan} thành công!`
                  )
                );
                dispatch(fetchUser(group));
                dispatch(editUserClick(response.data, tabIndex));
              } else {
                dispatch(
                  addUserSuccess(
                    `Thêm tài khoản ${response.data.taiKhoan} thành công!`
                  )
                );
                dispatch(fetchUser(group));
              }
            })
            .catch((e) => {
              dispatch({type: actionTypes.ADD_USER_FAIL});
            });
      }
  };

  export const fetchCourseNoneEnrollSuccess = (success, selectedUser) => {
    return {
      type: actionTypes.FETCH_COURSE_NONE_ENROLL_SUCCESS,
      success: success,
      selectedUser: selectedUser,
    };
  };

  export const fetchCourseNoneEnroll = (selectedUser) =>{
      return async (dispatch) =>{
          dispatch({type: actionTypes.FETCH_COURSE_NONE_ENROLL_START});
          const user = JSON.parse(localStorage.getItem("user"));
          const url = `/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${selectedUser.taiKhoan}`;
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          };
          axios({ method: "post", url, headers })
          .then((response) => {
            dispatch(fetchCourseNoneEnrollSuccess(response.data, selectedUser));
          })
          .catch((e) => {
            dispatch({type: actionTypes.FETCH_COURSE_NONE_ENROLL_FAIL});
          });
      }
  };

  export const searchUser = (keyword, group) =>{
      return async (dispatch) =>{
          dispatch({type: actionTypes.SEARCH_USER_START});
          try{
              const {data} = await ManageUserAPI.onSearchUser(keyword, group);
              if(!keyword){
                  dispatch(fetchUser(group));
              }else{
                  dispatch({type: actionTypes.SEARCH_USER_SUCCESS, payload: {data}})
              }
          } catch(e){
                dispatch({type: actionTypes.SEARCH_USER_FAIL});
          }
      }
  };

  export const fetchCourseApprovedSuccess = (success, selectedUser) => {
    return {
      type: actionTypes.FETCH_COURSE_APPROVED_SUCCESS,
      success: success,
      selectedUser: selectedUser,
    };
  };

  export const  fetchCourseApproved = (selectedUser) =>{
        return async (dispatch) =>{
          dispatch({type: actionTypes.FETCH_COURSE_APPROVED_START});
          const user = JSON.parse(localStorage.getItem("user"));
          const url = "/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet";
         const headers = {
           "Content-Type": "application/json",
           Authorization: `Bearer ${user.accessToken}`,
        };
         const data = {
            taiKhoan: selectedUser.taiKhoan,
          };
          axios({ method: "post", url, headers, data })
          .then((response) => {
            dispatch(fetchCourseApprovedSuccess(response.data, selectedUser));
          })
          .catch((error) => {
            dispatch({type: actionTypes.FETCH_COURSE_APPROVED_FAIL});
          });
        }
  }

  export const  approveCoursePending = (courseId, selectedUser) =>{
    return async (dispatch) =>{
        dispatch({type: actionTypes.APPROVE_COURSE_PENDING_START});
        const user = JSON.parse(localStorage.getItem("user"));
        const url = "/QuanLyKhoaHoc/GhiDanhKhoaHoc";
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        };
        const data = {
          maKhoaHoc: courseId,
          taiKhoan: selectedUser.taiKhoan,
        };
        axios({ method: "post", url, headers, data })
        .then((response) => {
          dispatch({type: actionTypes.APPROVE_COURSE_PENDING_SUCCESS, payload: response.data});
          dispatch(fetchCourseApprovalPending(selectedUser));
          dispatch(fetchCourseApproved(selectedUser));
          dispatch(fetchCourseNoneEnroll(selectedUser));
        })
        .catch((e) => {
          //console.log(error.response.data);
          dispatch({type: actionTypes.APPROVE_COURSE_PENDING_FAIL});
        });
    }
}

export const disapproveCourse  = (courseId, selectedUser) =>{
    return async (dispatch) =>{
      dispatch({type: actionTypes.DISAPPROVE_COURSE_START});
      const user = JSON.parse(localStorage.getItem("user"));
      const url = "/QuanLyKhoaHoc/HuyGhiDanh";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };
      const data = {
        maKhoaHoc: courseId,
        taiKhoan: selectedUser.taiKhoan,
      };
      axios({ method: "post", url, headers, data })
      .then((response) => {
        dispatch({type: actionTypes.DISAPPROVE_COURSE_SUCCESS, payload: response.data});
        dispatch(fetchCourseApproved(selectedUser));
        dispatch(fetchCourseApprovalPending(selectedUser));
      })
      .catch((e) => {
        dispatch({type: actionTypes.DISAPPROVE_COURSE_FAIL});
      });
    }
}
