import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import TextEditorRender from "../TextEditorRender";
import {Button} from "react-bootstrap";
import {FaPlusCircle, FaRegEye} from "react-icons/fa";

const SearchQuestion = () => {
    let {str} = useParams();
    let [status, setStatus] = useState(true)
    let [result,setResult]=useState([]);
    useEffect(() => {
        axios.get("http://localhost:3300/search/" + str).then(res => {
            setTimeout(show,3000);
            function show(){
                setResult(res.data)
                setStatus(false);
            }
        })
    }, []);


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
                                    <h2 className="title">Search : {str}</h2>
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
                            <div className={"col-lg-8 offset-lg-2"}>
                                {
                                    status ?
                                        <ReactLoading type={"spinningBubbles"} color={"coral"}></ReactLoading> :
                                        result.length > 0 ?
                                            result.map((value,index)=>{
                                                let {quesDate, question, ques_id} = value;

                                                return(
                                                    <table className={"table table-dark table-borderless"}>
                                                        <thead>
                                                        <tr>
                                                            <th className={"bg-secondary"}> {index+1})</th>
                                                            <th className={"bg-secondary"}>
                                                                <span className={"float-end text-end"}>Posted On: <strong>{quesDate}</strong></span>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan={"2"} className={"bg-secondary text-center ps-5 fs-5"}>
                                                                <TextEditorRender htmlString={question}/>
                                                            </th>

                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td colSpan={"2"} className={"text-end"}>
                                                                <Link to={`/user/view-others-answers/${ques_id}`} className={"btn btn-3"}>View Answers</Link>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>


                                                )
                                            })
                                            :
                                            <div className={"alert alert-danger"}>No data found</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchQuestion;