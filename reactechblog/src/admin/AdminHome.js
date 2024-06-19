import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import TextEditorRender from "../TextEditorRender";

const AdminHome = () => {
    let [questions, setQuestions] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3300/get-questions").then(res => {
            console.log(res.data);
            setQuestions(res.data);
        })
    }, [])

    return (
        <>
            <section className="faq p-60">
                <div className="container">
                    <div className="heading">
                        <div className="mb-5">
                            <h3 className="light-black text-center mb-5">Pending Answers for Questions</h3>

                            {
                                questions.map((value, index) => {
                                    let {quesDate, question, ques_id, user} = value;
                                    return (
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
                                                        <Link to={`/admin/view-answers/${ques_id}`} className={"btn btn-3"}>View Answers</Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default AdminHome;