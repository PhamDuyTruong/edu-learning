import {OPEN_SIDEBAR, DRAW_SIDEBAR_OPEN, DRAW_SIDEBAR_CLOSE} from "../constants/addSidebarAction"
const initialState = {
    sideOpen: false,
    sideDraw: false
}

function addSidebarReducer(state=initialState, action) {
    switch(action.type){
        case OPEN_SIDEBAR:
            return {...state, sideOpen: !state.sideOpen};
        case DRAW_SIDEBAR_OPEN:
            return {...state, sideDraw: true};
        case DRAW_SIDEBAR_CLOSE:
            return {...state, sideDraw: false};
        default:
            return state;
    }
}

export default addSidebarReducer;