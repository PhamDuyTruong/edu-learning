import {GET_COURSES_INDEX_FAILURE, GET_COURSES_INDEX_SUCCESS, GET_COURSES_INDEX_REQUEST} from '../constants/CourseIndexConstants';
import coursesAPI from "../services/coursesAPI";

export function getCoursesIndex(){
    return async (dispatch) => {
        dispatch({ type: GET_COURSES_INDEX_REQUEST });
        try {
          const { data } = await coursesAPI.getCourses();
          dispatch({ type: GET_COURSES_INDEX_SUCCESS, payload: { data } });
        } catch (error) {
          dispatch({
            type: GET_COURSES_INDEX_FAILURE,
            payload: { error: error.response.data },
          });
        }
      };
}