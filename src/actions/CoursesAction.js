import {GET_COURSES_FAILURE, GET_COURSES_SUCCESS, GET_COURSES_REQUEST} from '../constants/CoursesConstant';
import coursesAPI from "../services/coursesAPI";

export function getCoursesByCategory(category, group){
    return async(dispatch) =>{
        dispatch({type: GET_COURSES_REQUEST})
        try{
             const {data} = await coursesAPI.getCoursesByCategory(category, group);
             dispatch({ type: GET_COURSES_SUCCESS, payload: {data}});
        } catch(error){
          dispatch({
                  type: GET_COURSES_FAILURE,
                   //payload: { error: error.response.data },
             });
        }
    }
}