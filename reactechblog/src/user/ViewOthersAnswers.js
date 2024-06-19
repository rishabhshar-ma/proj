import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import TextEditorRender from "../TextEditorRender";
import {BsFillXCircleFill, BsPatchCheckFill} from "react-icons/bs";

const ViewOthersAnswers = () => {
    let {qid} = useParams();
    let [answers, setAnswers] = useState([])
    let [status, setStatus] = useState(true);
    useEffect(() => {
        view_answers();

    }, [])

    function view_answers() {
        axios.get("http://localhost:3300/get-answers/" + qid).then(res => {
            console.log(res.data);
            setStatus(false)
            setAnswers(res.data);
        })
    }

    function upStatus(answer, question) {
        // alert("Ans - "+answer+"  :: Question: "+question)
        axios.post("http://localhost:3300/update-ans-status", {
            answer, question
        }).then(res => {
            console.log(res.data);
            if (res.data === "updated") {
                view_answers();
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
                                    <h2 className={"text-white"}>Questions & It's Answers</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="faq p-60">
                <div className="container">
                    <div className="heading">
                        <div className="mb-5">
                            <h3 className="light-black text-center mb-5">Answers for Ques. No. {qid}</h3>
                            {
                                status ?
                                    <ReactLoading type={"spinningBubbles"} color={"coral"}></ReactLoading>
                                    :
                                    answers.length > 0 ?
                                        <table className={"table table-dark"}>
                                            <thead>
                                            <tr className={"text-center"}>
                                                <th>Sr. No.</th>
                                                <th>Answer</th>
                                                <th>Posted On</th>
                                                <td></td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                answers.map((value, index) => {
                                                    let {ans_id, answer, adate, question, status} = value;
                                                    return (
                                                        <tr key={index} className={"text-center"}>
                                                            <td>{index + 1}</td>
                                                            <td><TextEditorRender htmlString={answer}/></td>
                                                            <td>{adate}</td>
                                                            <td>
                                                                {

                                                                    status === "pending"  ?
                                                                        <p></p>
                                                                        :
                                                                        status ==="correct" ?
                                                                        <BsPatchCheckFill style={{fontSize:"xx-large",color:"green"}}/> :
                                                                            <BsFillXCircleFill style={{fontSize:"xx-large",color:"red"}}/>
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                        :
                                        <div className={"alert alert-danger"}>No data found</div>
                            }
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default ViewOthersAnswers;