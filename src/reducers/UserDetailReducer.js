import {FETCH_USER_DETAIL_SUCCESS, FETCH_USER_DETAIL_LOADING, FETCH_USER_DETAIL_FAIL} from '../constants/UserDetailConstant';

const initialState = {
    emplDetail: [],
    loading: false
}

function addUserDetail(state = initialState, action){
    switch(action.type){
        case FETCH_USER_DETAIL_LOADING:
            return {...state, loading: true}
        case FETCH_USER_DETAIL_SUCCESS:
            return {...state, emplDetail: action.payload.data, loading: false};
        case FETCH_USER_DETAIL_FAIL:
            return {...state, loading: false}
        default:
            return state;
    }
}

export default addUserDetail;