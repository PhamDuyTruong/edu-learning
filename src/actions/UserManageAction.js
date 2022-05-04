import * as actionTypes from "../constants/UserManagerConstant";
import ManageUserAPI from '../services/ManageUserAPI';

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
          dispatch({type: actionTypes.ADD_USER_START});
          try{
          const {data} = await ManageUserAPI.onFetchUser(group);
          dispatch({type: actionTypes.ADD_USER_SUCCESS, payload: {data}})
      }catch(e){
          dispatch({type: actionTypes.ADD_USER_FAIL})
      }
    }
  }

  export const fetchCourseApprovalPendingSuccess = (success, selectedUser) => {
    return {
      type: actionTypes.FETCH_COURSE_APPROVAL_PENDING_SUCCESS,
      success: {success},
      selectedUser: selectedUser,
    };
  };

  export const fetchCourseApprovalPending = (selectedUser) =>{
      return async (dispatch) =>{
          dispatch({type: actionTypes.FETCH_COURSE_APPROVAL_PENDING_START});
          const user = JSON.parse(localStorage.getItem("user"));
          const userData = {
            taiKhoan: selectedUser.taiKhoan,
          };
          try{
          const {data} = await ManageUserAPI.onFetchCoursePending(userData);
          dispatch(fetchCourseApprovalPendingSuccess(data, selectedUser))
      }catch(e){
          dispatch({type: actionTypes.FETCH_COURSE_APPROVAL_PENDING_FAIL})
      }
    }
  }

  export const deleteUser = (selectedUser, group) =>{
      return async (dispatch) =>{
          dispatch({type: actionTypes.DELETE_USER_START});
          try{
              const {data} = ManageUserAPI.onDeleteUser(selectedUser);
              dispatch({type: actionTypes.DELETE_USER_SUCCESS, payload: {data}})
              dispatch(fetchUser(group))
          } catch(e){
             dispatch({type: actionTypes.DELETE_USER_FAIL})
          }
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
          const userData = {
            taiKhoan: values.username,
            matKhau: values.password,
            hoTen: values.name,
            soDT: values.phone,
            maNhom: values.group,
            email: values.email,
            maLoaiNguoiDung: values.accountType,
          }
          try{
          if(isEdit){
            const {data} = await ManageUserAPI.onEditUser(userData);
            dispatch( addUserSuccess(
                `Cập nhật tài khoản ${data.taiKhoan} thành công!`));
            dispatch(fetchUser(group));
            dispatch(editCourseClick(data, tabIndex))
          }else{
              const {data} = await ManageUserAPI.onAddUser(userData);
              dispatch(
                addUserSuccess(
                  `Thêm tài khoản ${data.taiKhoan} thành công!`
                )
              );
              dispatch(fetchUser(group));
          }
        }catch(e){
            dispatch({type: actionTypes.ADD_USER_FAIL});
        }
      }
  };

  export const fetchCourseNoneEnrollSuccess = (success, selectedUser) => {
    return {
      type: actionTypes.FETCH_COURSE_NONE_ENROLL_SUCCESS,
      success: {success},
      selectedUser: selectedUser,
    };
  };

  export const fetchCourseNoneEnroll = (selectedUser) =>{
      return async (dispatch) =>{
          dispatch({type: actionTypes.FETCH_COURSE_NONE_ENROLL_START});
          try{
             const {data} = await ManageUserAPI.onFetchCourseNoneEnroll(selectedUser);
             dispatch(fetchCourseNoneEnrollSuccess(data, selectedUser))
          }catch(e){
            dispatch({type: actionTypes.FETCH_COURSE_NONE_ENROLL_FAIL});
          }
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
      success: {success},
      selectedUser: selectedUser,
    };
  };

  export const  fetchCourseApproved = (selectedUser) =>{
        return async (dispatch) =>{
          dispatch({type: actionTypes.FETCH_COURSE_APPROVED_START});
          const userData = {
            taiKhoan: selectedUser.taiKhoan,
          };
          try{
              const {data} = ManageUserAPI.onFetchCourseApprove(userData);
              dispatch(fetchCourseApprovedSuccess(data, selectedUser))
          }catch(e){
              dispatch({type: actionTypes.FETCH_COURSE_APPROVED_FAIL})
          }
        }
  }

  export const  approveCoursePending = (courseId, selectedUser) =>{
    return async (dispatch) =>{
        dispatch({type: actionTypes.APPROVE_COURSE_PENDING_START});
        const userData = {
          maKhoaHoc: courseId,
          taiKhoan: selectedUser.taiKhoan,
        };
        try{
          const {data} = ManageUserAPI.onApproveCoursePending(userData);
          dispatch({type: actionTypes.APPROVE_COURSE_PENDING_SUCCESS, payload: {data}});
          dispatch(fetchCourseApprovalPending(selectedUser));
          dispatch(fetchCourseApproved(selectedUser));
          dispatch(fetchCourseNoneEnroll(selectedUser));
        }catch(e){
          dispatch({type: actionTypes.APPROVE_COURSE_PENDING_FAIL});
        }
    }
}

export const disapproveCourse  = (courseId, selectedUser) =>{
    return async (dispatch) =>{
      dispatch({type: actionTypes.DISAPPROVE_COURSE_START});
      const userData = {
        maKhoaHoc: courseId,
        taiKhoan: selectedUser.taiKhoan,
      };
      try{
          const {data} = ManageUserAPI.onDisaprovedCourse(userData);
          dispatch({type: actionTypes.DISAPPROVE_COURSE_SUCCESS, payload: {data}});
          dispatch(fetchCourseApproved(selectedUser));
          dispatch(fetchCourseApprovalPending(selectedUser));
      }catch(e){
          dispatch({type: actionTypes.DISAPPROVE_COURSE_FAIL})
      }
    }
}
