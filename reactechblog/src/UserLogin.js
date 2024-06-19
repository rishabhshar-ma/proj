import {ErrorMessage} from "@hookform/error-message";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UserLogin = () => {
    let navigate = useNavigate();
    let {register, handleSubmit, reset, formState: {errors}} = useForm()

    function loginAction(data) {
        console.log(data);
        let {email,password} = data;
        axios.post('http://localhost:3300/userLoginAction',data).then(res =>{
            console.log(res.data);
            if(res.data ==="loggedIn"){
                Swal.fire({
                    icon:'success',
                    title:'User Logged In successfully',
                    showConfirmButton:false,
                    timer:1000
                })
                navigate('/user/home')
            }
            else{
                Swal.fire({
                    icon:'error',
                    title:'Invalid Credentials'
                })
            }

        })
    }

    return (
        <>
            <div className="login-register-box">
                <div className="section-title">
                    <h2 className="title">Login</h2>
                </div>

                <div className="login-register-form">
                    <form onSubmit={handleSubmit(loginAction)}>
                        <div className="single-form">
                            <input type="text"
                                   className="form-control" {...register('email', {required: 'Password is required'}, {
                                minLength: {
                                    value: 10, message: 'Enter at least 10 characters'
                                }
                            })} placeholder="Email"/>
                            <ErrorMessage name={'email'} errors={errors}
                                          render={({message}) => <p
                                              className={"text-danger"}>{message}</p>}></ErrorMessage>
                        </div>
                        <div className="single-form">
                            <input type="password" className="form-control"
                                   placeholder="Password" {...register('password', {required: 'Password is required'})}/>
                            <ErrorMessage name={'password'} errors={errors}
                                          render={({message}) => <p
                                              className={"text-danger"}>{message}</p>}></ErrorMessage>
                        </div>
                        <div className="form-btn">
                            <button className="btn" type={"submit"}>Login</button>
                        </div>
                        <div className="single-form">
                            <p><a href="#">Lost your password?</a></p>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
export default UserLogin;