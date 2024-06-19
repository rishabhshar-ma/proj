import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./HomePage";
import './App.css';
import AdminLogin from "./admin/AdminLogin";
import AdminNavbar from "./Components/AdminNavbar";
import AdminHome from "./admin/AdminHome";
import AdminAuthentication from "./Components/AdminAuthentication";
import ChangePassword from "./admin/ChangePassword";
import ManageCategories from "./admin/ManageCategories";
import UserLoginRegister from "./UserLoginRegister";
import "./App.css"
import UserNavbar from "./Components/UserNavbar";
import UserHome from "./user/UserHome";
import UserAuthentication from "./Components/UserAuthentication";
import UserChangePassword from "./user/UserChangePassword";
import PostQuestion from "./user/PostQuestion";
import MyQuestions from "./user/MyQuestions";
import MyAnswers from "./user/MyAnswers";
import ManageAdmins from "./admin/ManageAdmins";
import ViewAnswers from "./admin/ViewAnswers";
import ViewOthersAnswers from "./user/ViewOthersAnswers";
import SearchQuestion from "./user/SearchQuestion";
import ManageBlogs from "./user/ManageBlogs";
import Blogs from "./Blogs";
import BlogDetails from "./BlogDetails";
import About from "./About";
import BlogsForUsers from "./user/BlogsForUsers";
import BlogDetailsForUsers from "./user/BlogDetailsForUsers";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<HomePage/>}></Route>
                    <Route path={"/admin-login"} element={<AdminLogin/>}></Route>
                    <Route path={"/user-LoginRegister"} element={<UserLoginRegister/>}></Route>
                    <Route path={"/blogs"} element={<Blogs/>}></Route>
                    <Route path={"/blog-details/:blog_id"} element={<BlogDetails/>}></Route>
                    <Route path={"/about-us"} element={<About/>}></Route>

                {/*    Admin Panel Links*/}
                    <Route path={"/admin"} element={<AdminAuthentication Component={AdminNavbar}/>}>
                        <Route path={"home"} element={<AdminHome/>}/>
                        <Route path={"change-password"} element={<ChangePassword/>}/>
                        <Route path={"categories"} element={<ManageCategories/>}/>
                        <Route path={"admins"} element={<ManageAdmins/>}/>
                        <Route path={"view-answers/:qid"} element={<ViewAnswers/>}/>

                    </Route>

                {/*User Panel Links*/}
                    <Route path={"/user"} element={<UserAuthentication Component={UserNavbar}/>}>
                        <Route path={"home"} element={<UserHome/>}/>
                        <Route path={"change-password"} element={<UserChangePassword/>}/>
                        <Route path={"post-question"} element={<PostQuestion/>}/>
                        <Route path={"my-questions"} element={<MyQuestions/>}/>
                        <Route path={"my-answers/:ques_id"} element={<MyAnswers/>}/>
                        <Route path={"view-others-answers/:qid"} element={<ViewOthersAnswers/>}/>
                        <Route path={"search/:str"} element={<SearchQuestion/>}/>
                        <Route path={"manage-blogs"} element={<ManageBlogs/>}/>
                        <Route path={"all-blogs"} element={<BlogsForUsers/>}/>
                        <Route path={"blog-details-user/:blog_id"} element={<BlogDetailsForUsers/>}></Route>

                    </Route>

                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
