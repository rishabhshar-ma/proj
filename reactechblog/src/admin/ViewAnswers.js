import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import TextEditorRender from "../TextEditorRender";
import {BsFillXCircleFill, BsPatchCheckFill} from "react-icons/bs";

const ViewAnswers = () => {
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
                                                                    {status} === "pending" ?
                                                                        <button type={"button"} className={"btn btn-3"}
                                                                                onClick={() => upStatus(ans_id, question)}>Mark
                                                                            as Correct</button>
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
export default ViewAnswers;