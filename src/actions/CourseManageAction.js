import * as actionTypes from '../constants/CourseManageConstant';
import axios from '../services/axios'
import CourseManageAPI from "../services/CourseManageAPI"

export const fetchUsersClick = (selectedCourse, tabIndex) => {
    return {
      type: actionTypes.FETCH_USER_CLICK,
      tabIndex: tabIndex && Math.abs(tabIndex) !== 1 ? -tabIndex : 2,
      selectedCourse: selectedCourse,
    };
  };
  
  export const editCourseClick = (selectedCourse, tabIndex) => {
    return {
      type: actionTypes.EDIT_COURSE_CLICK,
      tabIndex: tabIndex && Math.abs(tabIndex) !== 2 ? -tabIndex : 1,
      isEdit: true,
      selectedCourse: selectedCourse,
    };
  };
  
  export const addCourseClick = () => {
    return {
      type: actionTypes.ADD_COURSE_CLICK,
      tabIndex: -1,
      isEdit: false,
    };
  };

  export const chooseCourseType = (courseType) => {
    return {
      type: actionTypes.CHOOSE_COURSE_TYPE,
      courseType: courseType,
    };
  };

  export const fetchCourseList = (keyWord, group, courseType) =>{
      return async (dispatch) =>{
          dispatch({type: actionTypes.FETCH_COURSES_LIST_LOADING});
          try{
              const {data} = await CourseManageAPI.onFetchCourse(keyWord, group, courseType);
              dispatch({type: actionTypes.FETCH_COURSES_LIST_SUCCESS, payload: {data}})
          }catch(e){
               dispatch({type: actionTypes.FETCH_COURSES_LIST_FAIL})
          }
      }
  };

  export const addCourseSuccess = (courseResponse, success) => {
    return {
      type: actionTypes.ADD_COURSE_SUCCESS,
      success: success,
    };
  };

  export const addCourse = (values, selectedImage, isEdit, group, courseType, tabIndex, selectedDate) =>{
    return (dispatch) => {
        dispatch({type: actionTypes.ADD_COURSE_LOADING});
        const user = JSON.parse(localStorage.getItem("user"));
        const date = new Date(selectedDate);
        const dateTimeFormat = new Intl.DateTimeFormat("en", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        const [
          { value: month },
          ,
          { value: day },
          ,
          { value: year },
        ] = dateTimeFormat.formatToParts(date);
        const dateString = `${day}/${month}/${year}`;
        let method = "post";
        let url = "/QuanLyKhoaHoc/ThemKhoaHoc";
        if (isEdit) {
          method = "put";
          url = "/QuanLyKhoaHoc/CapNhatKhoaHoc";
        }
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        };
    
        const data = {
          maKhoaHoc: values.courseId.trim(),
          biDanh: values.courseName.trim().replace(/\s+/g, "-").toLowerCase(),
          tenKhoaHoc: values.courseName.trim(),
          moTa: values.detail.trim(),
          luotXem: values.views,
          danhGia: values.rate,
          hinhAnh: ".jpg",
          maNhom: values.group,
          ngayTao: dateString,
          maDanhMucKhoaHoc: values.courseCode,
          taiKhoanNguoiTao: values.creator.trim(),
        };

        axios({ url, method, data, headers })
        .then((response) => {
          console.log("Post data: ", data);
          console.log("Add/Edit Response: ", response.data);
          let message = `Thêm khóa học mới ${response.data.tenKhoaHoc} thành công`;
          if (isEdit) {
            message = `Cập nhật khóa học ${response.data.tenKhoaHoc} thành công`;
          }
  
          if (selectedImage) {
            dispatch(
              uploadImage(
                selectedImage,
                response.data.tenKhoaHoc,
                response.data.maNhom
              )
            );
          }
  
          dispatch(addCourseSuccess(response.data, message));
          dispatch(fetchCourseList(null, group, courseType));
        }).catch((e) => {
          dispatch({type: actionTypes.ADD_COURSE_FAIL});
        });
    
    }
  }
  
  export const fetchUserListOfCourseSuccess = (userApprovedList) => {
    return {
      type: actionTypes.FETCH_USERS_LIST_OF_COURSE_SUCCESS,
      userApprovedList: userApprovedList,
    };
  };

  export const fetchUserListOfCourse = (course) =>{
    return (dispatch) =>{
    dispatch({type: actionTypes.FETCH_USERS_LIST_OF_COURSE_LOADING});
    const user = JSON.parse(localStorage.getItem("user"));
    let method = "post";
    let url = "/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    };
    const data = {
      maKhoaHoc: course.maKhoaHoc,
    };

    axios({ method, url, headers, data })
      .then((response) => {
        dispatch(fetchUserListOfCourseSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch({type: actionTypes.FETCH_USERS_LIST_OF_COURSE_FAIL});
      });
    }
  };
  

  export const fetchUserPendingListOfCourseSuccess = (userPendingList) => {
    return {
      type: actionTypes.FETCH_USER_PENDING_LIST_SUCCESS,
      userPendingList: userPendingList,
    };
  };

  export const fetchUserPendingListOfCourse = (course) =>{
    return (dispatch) => {
      dispatch({type: actionTypes.FETCH_USER_PENDING_LIST_LOADING});
      const user = JSON.parse(localStorage.getItem("user"));
      let method = "post";
      let url = "/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };
      const data = {
        maKhoaHoc: course.maKhoaHoc,
      };
  
      axios({ method, url, headers, data })
        .then((response) => {
          dispatch(fetchUserPendingListOfCourseSuccess(response.data));
        })
        .catch((e) => {
          console.log(e.response.data);
          dispatch({type: actionTypes.FETCH_USER_PENDING_LIST_FAIL});
        });
  }
}

export const fetchUserDeniedListOfCourseSuccess = (userDeniedList) => {
  return {
    type: actionTypes.FETCH_USER_DENIED_LIST_SUCCESS,
    userDeniedList: userDeniedList,
  };
};

export const fetchUserDeniedListOfCourse = (course) =>{
  return (dispatch) => {
    dispatch({type: actionTypes.FETCH_USER_DENIED_LIST_LOADING});
    const user = JSON.parse(localStorage.getItem("user"));
    let method = "post";
    let url = "/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    };
    const data = {
      maKhoaHoc: course.maKhoaHoc,
    };

    axios({ method, url, headers, data })
      .then((response) => {
        dispatch(fetchUserDeniedListOfCourseSuccess(response.data));
      })
      .catch((error) => {
        console.log(error.response.data);
        dispatch({type: actionTypes.FETCH_USER_DENIED_LIST_FAIL});
      });
  };
};

export const approveUserPendingSuccess = (success) => {
  return {
    type: actionTypes.APPROVE_USER_PENDING_SUCCESS,
    success: success,
  };
};

export const approveUserPending = (selectedCourse, selectedUser) =>{
  return (dispatch) => {
    dispatch({type: actionTypes.APPROVE_USER_PENDING_LOADING});
    const user = JSON.parse(localStorage.getItem("user"));
    const url = "/QuanLyKhoaHoc/GhiDanhKhoaHoc";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    };
    const data = {
      maKhoaHoc: selectedCourse.maKhoaHoc,
      taiKhoan: selectedUser.taiKhoan,
    };

    axios({ method: "post", url, headers, data })
      .then((response) => {
        dispatch(approveUserPendingSuccess(response.data));
        if (selectedCourse) {
          dispatch(fetchUserPendingListOfCourse(selectedCourse));
          dispatch(fetchUserListOfCourse(selectedCourse));
          dispatch(fetchUserDeniedListOfCourse(selectedCourse));
        }
      })
      .catch((error) => {
        dispatch({type: actionTypes.APPROVE_USER_PENDING_FAIL});
      });
  };
}

export const disapproveUserSuccess = (success) => {
  return {
    type: actionTypes.DISAPPROVE_USER_SUCCESS,
    success: success,
  };
};
export const disapproveUser = (selectedCourse, selectedUser) =>{
  return (dispatch) => {
    dispatch({type: actionTypes.DISAPPROVE_USER_LOADING});
    const user = JSON.parse(localStorage.getItem("user"));
    const url = "/QuanLyKhoaHoc/HuyGhiDanh";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    };
    const data = {
      maKhoaHoc: selectedCourse.maKhoaHoc,
      taiKhoan: selectedUser.taiKhoan,
    };
    axios({ method: "post", url, headers, data })
      .then((response) => {
        dispatch(disapproveUserSuccess(response.data));
        dispatch(fetchUserListOfCourse(selectedCourse));
        dispatch(fetchUserPendingListOfCourse(selectedCourse));
      })
      .catch((error) => {
        dispatch({type: actionTypes.DISAPPROVE_USER_FAIL});
      });
  };
};

export const uploadImageSuccess = (success) => {
  return {
    type: actionTypes.UPLOAD_IMAGE_SUCCESS,
    success: success,
  };
};

export const uploadImage = (selectedImage, courseName, group) =>{
  return (dispatch) => {
    dispatch({type: actionTypes.UPLOAD_IMAGE_LOADING});
    const url = "/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc";
    const formData = new FormData();
    formData.append("File", selectedImage, selectedImage.name);
    formData.append("tenKhoaHoc", courseName);
    formData.append("maNhom", group);

    axios({ method: "POST", url, data: formData })
      .then((response) => {
        dispatch(uploadImageSuccess(response.data));
      })
      .catch((error) => {
        console.log("uploadImage:", error.response.data);
        dispatch({type: actionTypes.UPLOAD_IMAGE_FAIL});
      });
  };
};

export const deleteCourseSuccess = (success) => {
  return {
    type: actionTypes.DELETE_COURSE_SUCCESS,
    success: success,
  };
};

export const deleteCourse = (selectedCourse, keyWord, group, courseType) => {
  return (dispatch) => {
    dispatch({type: actionTypes.DELETE_COURSE_LOADING});
    const user = JSON.parse(localStorage.getItem("user"));
    const url = `/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${selectedCourse.maKhoaHoc}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    };
    axios({ method: "delete", url, headers })
      .then((response) => {
        // console.log(response.data);
        dispatch(deleteCourseSuccess(response.data));
        dispatch(fetchCourseList(keyWord, group, courseType));
      })
      .catch((error) => {
        dispatch({type: actionTypes.DELETE_COURSE_FAIL});
      });
  };
};





