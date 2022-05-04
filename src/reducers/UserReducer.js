import {ENROLL_COURSE_FAIL, ENROLL_COURSE_LOADING, ENROLL_COURSE_SUCCESS, FETCH_USER_FAIL, FETCH_USER_LOADING, FETCH_USER_SUCCESS} from '../constants/UserConstants';

const initialState = {
    userList: [],
    success: null,
    error: null,
    loading: false
}

function addUser(state = initialState, action) {
     switch(action.type){
         case ENROLL_COURSE_LOADING:
             return {...state, loading: true}
        case ENROLL_COURSE_SUCCESS:
              return {...state, success: action.payload.success, loading: false}
        case ENROLL_COURSE_FAIL:
            return {...state, error: null, success: null, loading: false}
        case FETCH_USER_LOADING:
             return {...state, error: null, success: null, loading: true}
        case FETCH_USER_SUCCESS: 
           return {...state, userList: action.payload.data, success: action.payload.success, loading: false}
        case FETCH_USER_FAIL:
            return {...state, success: null, error: null, loading: false}
        default:
            return state
     }
}

export default addUser;