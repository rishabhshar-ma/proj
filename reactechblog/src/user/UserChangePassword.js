import {ErrorMessage} from "@hookform/error-message";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";

import axios from "axios";
import Swal from "sweetalert2";
import UserNavbar from "../Components/UserNavbar";
import Footer from "../Footer";

const UserChangePassword = () => {
    let [session, setSession] = useState({})
    useEffect(() => {
        axios.get("http://localhost:3300/user-check-authentication").then(res => {
            // console.log(res.data);
            if (res.data !== "fails") {

                setSession(res.data);
            }
        })
    }, [])
    let {register, handleSubmit, reset, formState: {errors}} = useForm()

    function change_password(data) {
        console.log(data);
        let {username, opassword, npassword, cpassword} = data;
        axios.post("http://localhost:3300/update-password", {
            username, opassword, npassword, cpassword
        }).then(res => {
            console.log(res.data);
            if (res.data === "Old not") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Old Password not matched'
                })
            } else if (res.data === "new and confirm not") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'New and Confirm Password not matched'
                })
            } else {
                reset();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Password updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })

    }

    return (
        <>
            <div className="section page-banner-section user-login-banner mb-4">
                <div className="shape-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="726.5px" height="726.5px">
                        <path fill-rule="evenodd" stroke="rgb(255, 255, 255)" stroke-width="1px" stroke-linecap="butt"
                              stroke-linejoin="miter" opacity="0.302" fill="none"
                              d="M28.14,285.269 L325.37,21.217 C358.860,-8.851 410.655,-5.808 440.723,28.14 L704.777,325.36 C734.846,358.859 731.802,410.654 697.979,440.722 L400.955,704.776 C367.132,734.844 315.338,731.802 285.269,697.978 L21.216,400.954 C-8.852,367.132 -5.808,315.337 28.14,285.269 Z"/>
                    </svg>
                </div>
                <div className="shape-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="972.5px" height="970.5px">
                        <path fill-rule="evenodd" stroke="rgb(255, 255, 255)" stroke-width="1px" stroke-linecap="butt"
                              stroke-linejoin="miter" fill="none"
                              d="M38.245,381.102 L435.258,28.158 C480.467,-12.32 549.697,-7.964 589.888,37.244 L942.832,434.257 C983.23,479.466 978.955,548.697 933.746,588.888 L536.733,941.832 C491.524,982.23 422.293,977.955 382.103,932.745 L29.158,535.732 C-11.32,490.523 -6.963,421.293 38.245,381.102 Z"/>
                    </svg>
                </div>
                <div className="container">
                    <div className="page-banner-wrap">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="page-banner text-center">
                                    <h2 className="title">Change Password</h2>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-wrap  mb-4">
                <div className="row justify-content-center">
                    <div className="col-lg-10">

                        <div className="contact-form">
                            <div className="contact-form-wrap">
                                <form id={"form"} onSubmit={handleSubmit(change_password)}>
                                    <div className={"row mb-4"}>
                                        <div className={"col-lg-6"}>
                                            <div className="single-form">
                                                <label htmlFor={"username"} className={"text-dark"}>Username</label>
                                                <input type={"text"} value={session} {...register('username')}
                                                       readOnly/>
                                            </div>
                                        </div>
                                        <div className={"col-lg-6"}>
                                            <div className="single-form">
                                                <label htmlFor={"opassword"} className={"text-dark"}>Old
                                                    Password</label>

                                                <input
                                                    type="password" {...register('opassword', {required: "Old Password is required"})}
                                                    id="opassword"/>
                                                <ErrorMessage name={"opassword"} errors={errors}
                                                              render={({message}) => <p
                                                                  className={"text-danger"}>{message}</p>}></ErrorMessage>

                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row mb-4"}>
                                        <div className={"col-lg-6"}>
                                            <div className="single-form">
                                                <label htmlFor="npassword">New Password</label>
                                                <input
                                                    type="password" {...register('npassword', {required: "New Password is required"})}
                                                    id="npassword"/>
                                                <ErrorMessage name={"npassword"} errors={errors}
                                                              render={({message}) => <p
                                                                  className={"text-danger"}>{message}</p>}></ErrorMessage>

                                            </div>
                                        </div>
                                        <div className={"col-lg-6"}>
                                            <div className="single-form">
                                                <label htmlFor="cpassword">Confirm Password</label>

                                                <input
                                                    type="password" {...register('cpassword', {required: "Confirm Password is required"})}
                                                    id="cpassword"/>
                                                <ErrorMessage name={"cpassword"} errors={errors}
                                                              render={({message}) => <p
                                                                  className={"text-danger"}>{message}</p>}></ErrorMessage>

                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className="col-12">
                                            <div className="form-btn">
                                                <button type="submit" className="btn btn-3 float-start">Update
                                                    Password
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserChangePassword;