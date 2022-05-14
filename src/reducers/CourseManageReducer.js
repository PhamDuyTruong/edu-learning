import * as actionTypes from '../constants/CourseManageConstant';

const initialState = {
   courseList: [],
   userApprovedList: [],
   userPendingList: [],
   userDeniedList: [],
   courseType: "all",
   tabIndex: null,
   isEdit: null,
   selectedCourse: null,
   success: null,
   error: null,
   loading: false,
}

function fetchCourseManage(state = initialState, action){
   switch(action.type){
      case actionTypes.CHOOSE_COURSE_TYPE:
           return {...state, courseType: action.courseType}
      case actionTypes.FETCH_USER_CLICK:
            return {...state, isEdit: null, tabIndex: action.tabIndex, selectedCourse: action.selectedCourse}
      case actionTypes.ADD_COURSE_CLICK:
          return {...state, isEdit: action.isEdit, tabIndex: action.tabIndex, selectedCourse: null} 
       case actionTypes.EDIT_COURSE_CLICK:
           return {...state, isEdit: action.isEdit, tabIndex: action.tabIndex, selectedCourse: action.selectedCourse}
        
        case actionTypes.FETCH_COURSES_LIST_LOADING:
            return {...state, courseList: [], userApprovedList: [], error: null, success: null, loading: true}
        case actionTypes.FETCH_COURSES_LIST_SUCCESS:
              return {...state, courseList: action.payload.data, loading: false}
        case actionTypes.FETCH_COURSES_LIST_FAIL:
            return {...state, courseList: [], error: null, loading: false, success: null}
        
        case actionTypes.FETCH_USERS_LIST_OF_COURSE_LOADING:
            return {...state, userApprovedList: [], error: null, success: null, loading: true};
        case actionTypes.FETCH_USERS_LIST_OF_COURSE_SUCCESS:
            return {...state, userApprovedList: action.userApprovedList, error: null, loading: false}
        case actionTypes.FETCH_USERS_LIST_OF_COURSE_FAIL:
            return {...state, error: null, loading: false, success: null}
        
        case actionTypes.FETCH_USER_PENDING_LIST_LOADING:
            return {...state, userPendingList: [], error: null, loading: true, success: null}
        case actionTypes.FETCH_USER_PENDING_LIST_SUCCESS:
            return {...state, userPendingList: action.userPendingList, error: null, loading: false}
        case actionTypes.FETCH_USER_PENDING_LIST_FAIL:
            return {...state, error: null, loading: false, success: null}
        
        case actionTypes.FETCH_USER_DENIED_LIST_LOADING:
            return {...state, userDeniedList: [], error: null, loading: true, success: null}
        case actionTypes.FETCH_USER_DENIED_LIST_SUCCESS:
            return {...state, userDeniedList: action.userDeniedList, loading: false, error: null}
        case actionTypes.FETCH_USER_DENIED_LIST_FAIL:
            return {...state, error: null, success: null, loading: false}
        
        case actionTypes.APPROVE_USER_PENDING_LOADING:
            return {...state, success: null, error: null, loading: true}
        case actionTypes.APPROVE_USER_PENDING_SUCCESS:
            return {...state, success: action.success, loading: false, error: null}
        case actionTypes.APPROVE_USER_PENDING_FAIL:
            return {...state, error: null, loading: false, success: null}
        
        case actionTypes.DISAPPROVE_USER_LOADING:
            return {...state, error: null, success: null, loading: true};
        case actionTypes.DISAPPROVE_USER_SUCCESS:
            return {...state, success: action.success, error: null, loading: false}
        case actionTypes.DISAPPROVE_USER_FAIL:
            return {...state, error: null, loading: false, success: null}
        
        case actionTypes.DELETE_COURSE_LOADING:
            return {...state, error: null, success: null, loading: true};
        case actionTypes.DELETE_COURSE_SUCCESS:
            return {...state, error: null, success: action.success, loading: false}
        case actionTypes.DELETE_COURSE_FAIL:
            return {...state, error: null, success: null, loading: false}
        
        case actionTypes.UPLOAD_IMAGE_LOADING:
            return {...state, error: null, success: null, loading: true}
        case actionTypes.UPLOAD_IMAGE_SUCCESS:
            return {...state, error: null, success: action.success, loading: false};
        case actionTypes.UPLOAD_IMAGE_FAIL:
            return {...state, error: null, loading: false}
        
        case actionTypes.ADD_COURSE_LOADING:
            return {...state, error: null, success: null, loading: true}
        case actionTypes.ADD_COURSE_SUCCESS:
            return {...state, error: null, success: action.success, loading: false}
        case actionTypes.ADD_COURSE_FAIL:
             return {...state, error: null, loading: false}
        
      default:
       return state; 
   }
}

export default fetchCourseManage;