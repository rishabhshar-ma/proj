import {Link, Outlet, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {FaSearch} from "react-icons/fa";
import Footer from "../Footer";
import {useState} from "react";

const UserNavbar = () => {
    let navigate = useNavigate();

    function logout() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger me-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Logout',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get("http://localhost:3300/user-logout").then(res => {
                    if (res.data === "logged out") {
                        swalWithBootstrapButtons.fire({
                            icon: 'success',
                            title: 'Logged Out Successfully!',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        navigate("/user-LoginRegister")
                    }
                })


            }
        })
    }


let [search,setSearch] = useState("")
    function searchForm(e){
        e.preventDefault()
        if(search!==""){
            navigate("/user/search/"+search);
        }
        else{
            Swal.fire({
                icon:"warning",
                title:"Search box cannot be empty"
            })
        }
    }
    return (
        <>
            <div id="header" className="section header-section header-section-02 mb-5">

                <div className="container">

                    <div className="header-wrap">

                        <div className="header-logo">
                            <Link className="logo-black" to="/admin/home"><img src="/assets/images/logo.png"
                                                                               alt=""/></Link>
                            <Link className="logo-white" to="/user/home"><img src="/assets/images/logo-2.png" alt=""/></Link>
                        </div>

                        <div className="header-menu d-none d-lg-block">
                            <ul className="main-menu">
                                <li className={"mt-3 text-center"}>
                                    <Link to="/user/home">Home</Link>
                                </li>
                                <li className={"mt-3 text-center"}>
                                    <Link to="javascript:void(0)">Questions/ Answers</Link>
                                    <ul className="sub-menu">
                                        <li className={"mt-2"}>
                                            <Link to="/user/post-question">Post a Question</Link>
                                        </li>
                                        <li className={"mt-2"}>
                                            <Link to="/user/my-questions">View Questions posted</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className={"mt-3 text-center"}>
                                    <Link to="/user/manage-blogs">My Blogs</Link>
                                </li>
                                <li className={"mt-3 text-center"}>
                                    <Link to="/user/all-blogs">Blogs & Comments</Link>
                                </li>



                                <form onSubmit={searchForm} className={"mt-4 float-end"}>
                                    <div className={"row mt-2 "}>
                                        <div className={"col-lg-8"}>
                                            <input type={"text"} placeholder={"Type a keyword to search"}
                                                   className={"form-control form-control-sm"} onChange={(e)=>setSearch(e.target.value)}/>

                                        </div>
                                        <div className={"col-lg-2"}>
                                            <button type={"submit"} className={"btn btn-3"}><FaSearch/></button>
                                        </div>
                                    </div>
                                </form>
                                <li>
                                    <Link className={"btn btn-3 text-white"} to="/">Settings</Link>
                                    <ul className="sub-menu">
                                        <li><Link to="/user/change-password">Change Password</Link></li>
                                        <li><Link to={"javascript:void(0);"} className={"btn-link"}
                                                  style={{textDecoration: "none"}} onClick={logout}>Logout</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Outlet/>
            <Footer/>
        </>
    )
}
export default UserNavbar;