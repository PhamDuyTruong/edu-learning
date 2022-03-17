import {GET_COURSES_INDEX_FAILURE, GET_COURSES_INDEX_SUCCESS, GET_COURSES_INDEX_REQUEST} from '../constants/CourseIndexConstants';
const initialState = {
    coursesIndex: [],
    isLoadingCourses:false,
    error:null
}

function coursesIndexReducer(state= initialState, action){
    switch(action.type){
        case GET_COURSES_INDEX_REQUEST:{
            return {...state, isLoadingCourses:true, error: null}
        }
        case GET_COURSES_INDEX_SUCCESS: {
            return {...state, isLoadingCourses:false, coursesIndex: action.payload.data}
        }
        case GET_COURSES_INDEX_FAILURE:{
            return {...state, isLoadingCourses: false, error: action.payload.error}
        }
        default:
            return state;
    }
}

export default coursesIndexReducer;
