import PublicNavbar from "../Components/PublicNavbar";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../Footer";

const AdminLogin = () => {
    let navigate = useNavigate();
    let {register, handleSubmit, reset, formState: {errors}} = useForm()

    function login_action(data) {
        let {username, password} = data;
        console.log(data);
        axios.post("http://localhost:3300/admin-login-action", {
            username, password
        }).then(res => {
            console.log(res.data);
            if (res.data === "success") {
                navigate("/admin/home")
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Invalid credentials"
                })
            }
        })
    }

    return (
        <>
            <PublicNavbar/>
            <div className="section techwix-hero-section-03 d-flex align-items-center header-bg">
                <div className="shape-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="726.5px" height="726.5px">
                        <path fill-rule="evenodd" stroke="rgb(255, 255, 255)" stroke-width="1px"
                              stroke-linecap="butt" stroke-linejoin="miter" opacity="0.302" fill="none"
                              d="M28.14,285.269 L325.37,21.216 C358.860,-8.852 410.655,-5.808 440.723,28.14 L704.777,325.37 C734.846,358.860 731.802,410.654 697.979,440.723 L400.956,704.777 C367.133,734.845 315.338,731.802 285.269,697.979 L21.216,400.955 C-8.852,367.132 -5.808,315.337 28.14,285.269 Z"/>
                    </svg>
                </div>
                <div className="shape-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="972.5px" height="970.5px">
                        <path fill-rule="evenodd" stroke="rgb(255, 255, 255)" stroke-width="1px"
                              stroke-linecap="butt" stroke-linejoin="miter" fill="none"
                              d="M38.245,381.103 L435.258,28.158 C480.467,-12.32 549.697,-7.964 589.888,37.244 L942.832,434.257 C983.23,479.466 978.955,548.697 933.746,588.888 L536.733,941.832 C491.524,982.23 422.293,977.955 382.103,932.746 L29.158,535.733 C-11.32,490.524 -6.963,421.293 38.245,381.103 Z"/>
                    </svg>
                </div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="hero-content">
                                <h2 className="title text-center">Admin Login</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section techwix-contact-section techwix-contact-section-02 techwix-contact-section-03 section-padding-02 mb-5">
                <div className="container">

                    <div className="contact-wrap">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">

                                <div className="contact-form">
                                    <div className="contact-form-wrap">


                                        <form id={"form"} onSubmit={handleSubmit(login_action)}>
                                            <div className="row">

                                                <div className="col-sm-12">
                                                    <div className="single-form">
                                                        <label htmlFor="username">Your username</label>

                                                        <input
                                                            type="username" {...register('username', {required: "username is required"})}
                                                            id="username" autoComplete="off"/>
                                                        <ErrorMessage name={"username"} errors={errors}
                                                                      render={({message}) => <p
                                                                          className={"text-danger"}>{message}</p>}></ErrorMessage>

                                                    </div>
                                                </div>
                                                <div className="col-sm-12">
                                                    <div className="single-form">
                                                        <label htmlFor="username">Your Password</label>
                                                        <input type="password" {...register('password', {
                                                            required: "Password is required", minLength: {
                                                                value: 2,
                                                                message: "At Least enter 2 characters"
                                                            }
                                                        })} id="username" autoComplete="off"/>
                                                        <ErrorMessage name={"password"} errors={errors}
                                                                      render={({message}) => <p
                                                                          className={"text-danger"}>{message}</p>}></ErrorMessage>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12">
                                                    <div className="form-btn">
                                                        <button className="btn" type="submit">Login</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default AdminLogin;