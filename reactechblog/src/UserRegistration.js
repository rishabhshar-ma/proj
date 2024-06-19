import {ErrorMessage} from "@hookform/error-message";
import {useForm} from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const UserRegistration = () => {
    let {register, handleSubmit, reset, formState: {errors}} = useForm()

    function registerForm(data) {
        let {email, fullname, password, phone} = data;
        axios.post("http://localhost:3300/user-registration", data).then(res => {
            console.log(res.data);
            if (res.data === "inserted") {
                reset()
                Swal.fire({
                    icon: 'success',
                    title: 'User registered successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon:'error',
                    title:'Email already exists'
                })
            }
        })
    }

    return (
        <>
            <div className="login-register-box">
                <div className="section-title">
                    <h2 className="title">Register</h2>
                </div>

                <div className="login-register-form">
                    <form onSubmit={handleSubmit(registerForm)}>
                        <div className="single-form">
                            <input type="email" className="form-control"
                                   placeholder="Email" {...register('email', {required: "Email is required"})}/>
                            <ErrorMessage name={"email"} errors={errors}
                                          render={({message}) => <p
                                              className={"text-danger"}>{message}</p>}></ErrorMessage>
                        </div>
                        <div className="single-form">
                            <input type="text" className="form-control"
                                   placeholder="Full Name" {...register('fullname', {required: 'Full Name is required'})}/>
                            <ErrorMessage name={"fullname"} errors={errors}
                                          render={({message}) => <p
                                              className={"text-danger"}>{message}</p>}></ErrorMessage>
                        </div>
                        <div className="single-form">
                            <input type="password" className="form-control"
                                   placeholder="Password" {...register('password', {required: 'Password is required'})}/>
                            <ErrorMessage name={"password"} errors={errors}
                                          render={({message}) => <p
                                              className={"text-danger"}>{message}</p>}></ErrorMessage>
                        </div>
                        <div className="single-form">
                            <input type="text" className="form-control"
                                   placeholder="Phone No." {...register('phone', {required: 'Phone No is required'}, {
                                minLength: {
                                    value: 10, message: 'Enter at least 10 digits'
                                }
                            })}/>
                            <ErrorMessage name={"phone"} errors={errors}
                                          render={({message}) => <p
                                              className={"text-danger"}>{message}</p>}></ErrorMessage>
                        </div>
                        <div className="form-btn">
                            <button className="btn" type={"submit"}>Register</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
export default UserRegistration;