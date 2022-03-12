import { combineReducers } from "redux";
import addSidebarReducer from "./addSidebarRdeucer";


const rootReducer = combineReducers({
    addSidebar: addSidebarReducer,
});

export default rootReducer;