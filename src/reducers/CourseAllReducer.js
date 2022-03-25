import {GET_COURSES_ALL_FAILURE, GET_COURSES_ALL_SUCCESS, GET_COURSES_ALL_REQUEST} from "../constants/CourseAll"

const initialState = {
    courseAll: [],
    loading: false
}

function courseAll(state = initialState, action){
    switch (action.type){
        case GET_COURSES_ALL_REQUEST:
            return {...state, loading: true}
         case GET_COURSES_ALL_SUCCESS:
             return {...state, loading: false, courseAll: action.payload.data}
          case GET_COURSES_ALL_FAILURE:
              return {...state, loading: false}
       default:
           return state;
    }

}

export default courseAll;