import {ENROLL_COURSE_FAIL, ENROLL_COURSE_LOADING, ENROLL_COURSE_SUCCESS, FETCH_USER_FAIL, FETCH_USER_LOADING, FETCH_USER_SUCCESS} from '../constants/UserConstants';
import userAPI from "../services/userAPI";

export const fetchUserList = (courseId) =>{
    return async (dispatch) =>{
        dispatch({type: FETCH_USER_LOADING});
        const user = JSON.parse(localStorage.getItem("user"));
        if(user && user.accessToken){
            try{
              const {data} = await userAPI.fetchUser(courseId);
              dispatch({type: FETCH_USER_SUCCESS, payload: {data}})
            } catch(e){
                dispatch({type: FETCH_USER_FAIL})
            }
        }
    }
}

export const enrollCourse = (courseId, isMe) =>{
    return async(dispatch) =>{
        dispatch({type: ENROLL_COURSE_LOADING})
        const user = JSON.parse(localStorage.getItem("user"));

        const userData = {
            maKhoaHoc: courseId,
            taiKhoan: user.taiKhoan
        }

        try{
           if(isMe){
               const {success} =  await userAPI.deleteRegister(userData);
               dispatch({type: ENROLL_COURSE_SUCCESS, payload: {success}})
               dispatch(fetchUserList(courseId))
           } else{
               const {success} = await userAPI.registerCourse(userData);
               dispatch({type: ENROLL_COURSE_SUCCESS, payload: {success}})
               dispatch(fetchUserList(courseId))
           }

        }catch(e){
            dispatch({type: ENROLL_COURSE_FAIL})
        }
    }
}