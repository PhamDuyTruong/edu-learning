import { combineReducers } from "redux";
import addSidebarReducer from "./addSidebarRdeucer";
import coursesReducer from "./coursesReducer";
import coursesIndexReducer from "./coursesIndexReducer"
import addDarkTheme from "./darkThemeReducer"
import courseDetail from "./courseDetail";
import courseAll from "./CourseAllReducer";
import getAuth from "./authReducer";
import addUser from "./UserReducer";
import addUserDetail from "./UserDetailReducer";
import fetchUserManage from "./UserManageReducer";


const rootReducer = combineReducers({
    addSidebar: addSidebarReducer,
    courses: coursesReducer,
    coursesIndex: coursesIndexReducer,
    darktheme: addDarkTheme,
    courseDetail: courseDetail,
    courseAll: courseAll,
    auth: getAuth,
    user: addUser,
    userDetail: addUserDetail ,
    userManage: fetchUserManage
});

export default rootReducer;