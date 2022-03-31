import {GET_COURSES_ALL_FAILURE, GET_COURSES_ALL_SUCCESS, GET_COURSES_ALL_REQUEST} from "../constants/CourseAll"
import coursesAPI from "../services/coursesAPI";


export function getCourseAll(courseType, group, keyword){
     return async (dispatch) =>{
        dispatch({type: GET_COURSES_ALL_REQUEST})
        try{
             const {data} = await coursesAPI.getCourseAll(courseType, group, keyword);
             dispatch({ type: GET_COURSES_ALL_SUCCESS, payload: {data}});
        } catch(error){
          dispatch({
                  type: GET_COURSES_ALL_FAILURE,
                   //payload: { error: error.response.data },
             });
        }
     }
}