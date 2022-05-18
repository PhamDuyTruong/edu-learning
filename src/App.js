import {useEffect} from 'react';
import {lazy, Suspense} from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {useDispatch} from 'react-redux';
import AppLayout from "./layouts/AppLayout";
import PageNotFound from './pages/PageNotFound';
import {authCheckState} from './actions/authAction'
const About = lazy(() => import("./pages/About"));;
const Auth = lazy(() => import("./pages/Auth"));;
const CourseDetail = lazy(() => import("./pages/CourseDetail/CourseDetail"));;
const Courses = lazy(() => import("./pages/Courses/Courses"));
const Home = lazy(() => import("./pages/Home"));;
const LogOut= lazy(() => import("./pages/Logout"));
const UserCourses = lazy(() => import("./pages/UserCourses/UserCourses"));;
const UserManagement = lazy(() => import("./pages/UserManager/UserManagement"));;
const CourseManagement = lazy(() => import("./pages/CourseManage/CourseManagement"));;


const AdminLayout = ({ Component, isAdmin, ...props }) => {
     return (
       <Route
         {...props}
         render={() =>
           isAdmin ? (
             <AppLayout>
               <Component />
             </AppLayout>
           ) : (
             <></>
           )
         }
       />
     );
   };


function App() {
     const user = JSON.parse(localStorage.getItem("user"));
     const isAdmin = user && user.maLoaiNguoiDung === "GV";
     const dispatch = useDispatch();
    useEffect(() =>{
      dispatch(authCheckState());
    }, [authCheckState])
  return (
    <Suspense fallback={<div>
      <i className="fa fa-spinner fa-spin" style={{color:"#79DAE8"}}></i>Loading...
    </div>}>
    <BrowserRouter>
         <Switch>
            <Route path="/">
                 <AppLayout>
                      <Switch>
                         <Route path="/" exact>
                             <Home />
                         </Route>
                         <Route path="/about">
                              <About />
                         </Route>
                         <Route path="/courses/:id">
                             <CourseDetail />
                         </Route>
                         <Route path="/courses">
                              <Courses />
                         </Route>
                         <Route path="/user-courses">
                              <UserCourses />
                         </Route>
                         <Route path="/logout">
                              <LogOut/>
                         </Route>
                         <Route path="/sign-in">
                            <Auth/>
                        </Route>
                        <Route path="/sign-up">
                          <Auth />
                       </Route>
                       <AdminLayout
                            path="/users-management"
                           Component={UserManagement}
                            isAdmin={isAdmin}
                        />
                         <AdminLayout 
                            path="/courses-management"
                            Component={CourseManagement}
                           isAdmin = {isAdmin}
                        />
                       <Route path="*">
                            <PageNotFound />
                        </Route>
                      </Switch>
                 </AppLayout>
            </Route>
            
         </Switch>
    </BrowserRouter>
    </Suspense>
  );
}

export default App;
