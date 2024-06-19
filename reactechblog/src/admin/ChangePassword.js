import {ErrorMessage} from "@hookform/error-message";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";

import axios from "axios";
import Swal from "sweetalert2";
import AdminNavbar from "../Components/AdminNavbar";

const ChangePassword = () => {
    let [session, setSession] = useState({})
    useEffect(() => {
        axios.get("http://localhost:3300/admin-check-authentication").then(res => {
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
            <div className="contact-wrap mb-4">
                <div className="row justify-content-center">
                    <div className="col-lg-10">

                        <div className="contact-form">
                            <div className="contact-form-wrap">
                                <div className="heading-wrap text-center mb-4">

                                    <h3 className="title">Change Password</h3>
                                </div>
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
export default ChangePassword;