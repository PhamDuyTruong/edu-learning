import {GET_COURSES_DETAIL_FAILURE, GET_COURSES_DETAIL_SUCCESS, GET_COURSES_DETAIL_REQUEST} from "../constants/CourseDetailConstant"

const initialState ={
    courseDetail: [],
    loading: false,
    error: null
}

function courseDetail(state = initialState, action){
     switch (action.type){
         case GET_COURSES_DETAIL_REQUEST:
             return {...state, loading: true, error: null}
          case GET_COURSES_DETAIL_SUCCESS:
              return {...state, loading: false, courseDetail: action.payload.data}
           case GET_COURSES_DETAIL_FAILURE:
               return {...state, loading: false, error: null}
        default:
            return state;
     }

}

export default courseDetail;