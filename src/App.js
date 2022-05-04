import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import About from "./pages/About";
import Auth from "./pages/Auth";
import CourseDetail from "./pages/CourseDetail/CourseDetail";
import Courses from "./pages/Courses/Courses";
import Home from "./pages/Home";
import LogOut from './pages/Logout'
import UserCourses from "./pages/UserCourses/UserCourses";
import UserManagement from "./pages/UserManager/UserManagement";


const AdminLayout = ({ Component, isAdmin, ...props }) => {
     return (
       <Route
         {...props}
         render={() =>
           isAdmin ? (
             <UserLayout>
               <Component />
             </UserLayout>
           ) : (
             <></>
           )
         }
       />
     );
   };

   const RouteUser = ({ Component, ...props }) => {
     return (
       <Route
         {...props}
         render={() => (
           <AppLayout>
             <Component />
           </AppLayout>
         )}
       />
     );
   };
   


function App() {
     const user = JSON.parse(localStorage.getItem("user"));
     const isAdmin = user && user.maLoaiNguoiDung === "GV";
  return (
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
                      </Switch>
                 </AppLayout>
                 <AdminLayout
                  path="/users-management"
                  Component={UserManagement}
                  isAdmin={isAdmin}
                  />
                 
            </Route>
         </Switch>
    </BrowserRouter>
  );
}

export default App;
