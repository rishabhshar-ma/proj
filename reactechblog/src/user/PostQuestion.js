import {ErrorMessage} from "@hookform/error-message";
import {useForm} from "react-hook-form";
import axios, {head} from "axios";
import Swal from "sweetalert2";
import {useEffect, useState} from "react";
const PostQuestion = () => {
    let [category,setCategory]= useState([]);
    let {register, handleSubmit, reset, formState: {errors}} = useForm()
    useEffect(()=>{
        axios.get("http://localhost:3300/view-categories").then(res=>{
            console.log(res.data);
            setCategory(res.data);
        })
    },[])
    function questionAction(data){
        console.log(data);
        let {category,question} =data;
        let nquestion = `<pre>${question}</pre>`;
        axios.post("http://localhost:3300/post-question",{
            category, nquestion
        }).then(res=>{
            console.log(res.data);
            if(res.data ==="inserted"){
                reset()

                Swal.fire({
                    icon:"success",
                    title:'Question posted successfully',
                    showConfirmButton: false,timer:1500
                })
            }
            else{
                Swal.fire({
                    icon:"error",
                    title:res.data
                })
            }
        })
    }

    return (
        <>
            <div className="section page-banner-section user-login-banner">
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
                                    <h2 className="title">Post a Question</h2>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section login-register-section section-padding-02 mb-5">
                <div className="container">
                    <div className="login-register-wrap">
                        <div className="row gx-5">
                            <div className="col-lg-8 offset-lg-2">
                                <div className="login-register-form">

                                    <form onSubmit={handleSubmit(questionAction)}>
                                        <div className="single-form mb-4">
                                            <label htmlFor={"category"}>Select a Category</label>
                                            <select className="form-control" id={"category"}
                                                    {...register('category', {required: "Category is required"})}>
                                            <option value={""}>Select</option>
                                                {
                                                    category.map((value,index)=>{
                                                        let {cat_id,cat_name} = value
                                                        return(
                                                            <option key={index} value={cat_id}>{cat_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <ErrorMessage name={"category"} errors={errors}
                                                          render={({message}) => <p
                                                              className={"text-danger"}>{message}</p>}></ErrorMessage>
                                        </div>
                                        <div className="single-form mb-4">
                                            <label htmlFor={"question"}>Question</label>
                                            <textarea rows={"5"} {...register('question',{required:'Question is required'})}/>
                                            <ErrorMessage name={"question"} errors={errors}
                                                          render={({message}) => <p
                                                              className={"text-danger"}>{message}</p>}></ErrorMessage>
                                        </div>
                                        <div className="form-btn ">
                                            <button className="btn" type={"submit"}>Submit</button>
                                        </div>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default PostQuestion