import {Link, Outlet, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Footer from "../Footer";

const AdminNavbar = () => {
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
                axios.get("http://localhost:3300/admin-logout").then(res => {
                    if (res.data === "logged out") {
                        swalWithBootstrapButtons.fire({
                            icon: 'success',
                            title: 'Logged Out Successfully!',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        navigate("/admin-login")
                    }
                })


            }
        })
    }


    return (
        <>
            <div id="header" className="section header-section-02.sticky bg-black header-section-02 mb-5">

                <div className="container">

                    <div className="header-wrap">

                        <div className="header-logo">
                            <Link className="logo-black" to="/admin/home"><img src="/assets/images/logo.png" alt=""/></Link>
                            <Link className="logo-white" to="/admin/home"><img src="/assets/images/logo-2.png" alt=""/></Link>
                        </div>

                        <div className="header-menu d-none d-lg-block">
                            <ul className="main-menu">

                                <li className={"mt-2"}>
                                    <Link to="/admin/home">Home</Link>
                                </li>
                                <li className={"mt-2"}>
                                    <Link to="javascript:void(0);">Manage</Link>
                                    <ul className="sub-menu">
                                        <li><Link to="/admin/admins">Admins</Link></li>
                                        <li><Link to="/admin/categories">Categories</Link></li>
                                    </ul>
                                </li>
                                <li >
                                    <Link className={"btn btn-3 text-white"} to="/">Settings</Link>
                                    <ul className="sub-menu">
                                        <li><Link to="/admin/change-password">Change Password</Link></li>
                                        <li><Link to={"javascript:void(0);"} className={"btn-link"} style={{textDecoration:"none"}} onClick={logout}>Logout</Link></li>
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
export default AdminNavbar;