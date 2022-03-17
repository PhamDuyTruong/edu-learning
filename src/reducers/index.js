import { combineReducers } from "redux";
import addSidebarReducer from "./addSidebarRdeucer";
import coursesReducer from "./coursesReducer";
import coursesIndexReducer from "./coursesIndexReducer"


const rootReducer = combineReducers({
    addSidebar: addSidebarReducer,
    courses: coursesReducer,
    coursesIndex: coursesIndexReducer
});

export default rootReducer;