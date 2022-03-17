import {GET_COURSES_SUCCESS, GET_COURSES_FAILURE, GET_COURSES_REQUEST} from '../constants/CoursesConstant'
const initialstate ={
    courses: [],
    isLoading: false,
    error: null,
}

function coursesReducer(state= initialstate, action){
    switch(action.type){
        case GET_COURSES_REQUEST:{
            return {...state, isLoading:true, error:null}
        }
        case GET_COURSES_SUCCESS:{
            return{...state, courses: action.payload.data, isLoading:false}
        }
        case GET_COURSES_FAILURE:{
            return {...state, isLoading:false, error: null}
        }
        default: 
            return state;
    }

}

export default coursesReducer