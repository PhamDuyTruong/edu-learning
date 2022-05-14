import * as actionTypes from "../constants/UserManagerConstant";

const initialState = {
    userList: [],
    tabIndex: null,
    avatarIndex: null,
    isEdit: null,
    selectedUser: null,
    coursesPendingList: [],
    coursesApprovedList: [],
    coursesNoneEnrollList: [],
    success: null,
    error: null,
    loading: false,
}

function fetchUserManage(state = initialState, action){
    switch(action.type){
        case actionTypes.FETCH_INFO_CLICK:
            return {...state, isEdit: null, tabIndex: action.tabIndex, selectedUser: action.selectedUser}
        case actionTypes.ADD_USER_CLICK:
            return {...state, isEdit: action.isEdit, tabIndex: action.tabIndex, selectedUser: null};
        case actionTypes.EDIT_USER_CLICK:
            return {...state, isEdit: action.isEdit, tabIndex: action.tabIndex, selectedUser: action.selectedUser}

        case actionTypes.FETCH_USERS_START:
            return {...state, error: null, success: null, loading: true};
        case actionTypes.FETCH_USERS_SUCCESS:
            return {...state, userList: action.payload.data, loading: false};
        case actionTypes.FETCH_USERS_FAIL:
            return{...state, error: null, loading: null};

        case actionTypes.ADD_USER_START:
            return {...state, error: null, success: null};
        case actionTypes.ADD_USER_SUCCESS:
            return {...state, error: null, success:action.success}
        case actionTypes.ADD_USER_FAIL:
            return {...state, error: null, success: null};
        
        case actionTypes.DELETE_USER_START:
            return {...state, error: null, loading: true};
        case actionTypes.DELETE_USER_SUCCESS:
            return {...state, error: null, success: action.payload, loading: false};
        case actionTypes.DELETE_USER_FAIL:
            return {...state, error: null, success: null, loading: null};
        
        case actionTypes.FETCH_COURSE_APPROVAL_PENDING_START:
            return {...state, error: null, loading: true};
        case actionTypes.FETCH_COURSE_APPROVAL_PENDING_SUCCESS:
            return {...state, error: null, coursesPendingList: action.success, selectedUser: action.selectedUser, loading: false}
        case actionTypes.FETCH_COURSE_APPROVAL_PENDING_FAIL:
            return {...state, error: null, success: null, loading: false};

        case actionTypes.APPROVE_COURSE_PENDING_START:
            return {...state, error: null, loading: true};
        case actionTypes.APPROVE_COURSE_PENDING_SUCCESS:
            return {...state, error: null, success: action.payload, loading: false};
        case actionTypes.APPROVE_COURSE_PENDING_FAIL:
            return {...state, error: null, success: null, loading: false}
        
        case actionTypes.FETCH_COURSE_APPROVED_START:
            return {...state, error: null, success: null, loading: true};
        case actionTypes.FETCH_COURSE_APPROVED_SUCCESS:
            return {...state, error: null, coursesApprovedList: action.success,  selectedUser: action.selectedUser, loading: false};
        case actionTypes.FETCH_COURSE_APPROVED_FAIL:
            return {...state, error: null, success: null, loading: false};
        
        case actionTypes.DISAPPROVE_COURSE_START:
            return {...state, error: null, success: null, loading: true};
        case actionTypes.DISAPPROVE_COURSE_SUCCESS:
            return {...state, error: null, success: action.payload, loading: false};
        case actionTypes.DISAPPROVE_COURSE_FAIL:
            return {...state, error: null, success: null, loading: false};
        
        case actionTypes.FETCH_COURSE_NONE_ENROLL_START:
            return {...state, error: null, success: null, loading: true};
        case actionTypes.FETCH_COURSE_NONE_ENROLL_SUCCESS:
            return {...state, error: null, coursesNoneEnrollList:action.success, loading: false};
        case actionTypes.FETCH_COURSE_NONE_ENROLL_FAIL:
            return {...state, error: null, success: null, loading: false}

        case actionTypes.SEARCH_USER_START:
            return {...state, error: null, userList: [], success: null, loading: true};
        case actionTypes.SEARCH_USER_SUCCESS:
            return {...state, error: null, userList: action.payload.data, loading: false};
        case actionTypes.SEARCH_USER_FAIL:
            return {...state, error: null, loading: false, success: null};

        default:
            return state;
    }
};

export default fetchUserManage;