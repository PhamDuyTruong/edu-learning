import {GET_COURSES_DETAIL_FAILURE, GET_COURSES_DETAIL_SUCCESS, GET_COURSES_DETAIL_REQUEST} from "../constants/CourseDetailConstant";
import coursesAPI from "../services/coursesAPI";

export function getCourseDetail(courseId){
    return async (dispatch) =>{
       dispatch({type: GET_COURSES_DETAIL_REQUEST});
       try{
           const {data} = await coursesAPI.getDetailCourse(courseId);
           dispatch({type: GET_COURSES_DETAIL_SUCCESS, payload: {data}})
       }catch (error){
            dispatch({
                type: GET_COURSES_DETAIL_FAILURE
            })
       }
    }
}