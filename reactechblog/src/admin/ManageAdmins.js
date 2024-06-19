import {ErrorMessage} from "@hookform/error-message";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Button, Modal} from 'react-bootstrap';
import {FaPlus} from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const ManageAdmins = () => {
    let [admins, setAdmins] = useState([]);
    useEffect(() => {
        fetchAdmins();
    }, []);
    let {register, handleSubmit, reset, formState: {errors}} = useForm()

    function add_admin(data) {
        console.log(data)
        let {username, password, fullname, phone} = data;
        axios.post("http://localhost:3300/add-admin-action", {
            username, password, fullname, phone
        }).then(res => {
            console.log(res.data);
            if (res.data === "exists") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    html: 'Username already exists'
                })
            } else if (res.data === "inserted") {
                reset();
                Swal.fire({
                    icon: 'success',
                    title: 'New admin added successfully',
                    timer: 1500,
                    showConfirmButton: false
                })
                fetchAdmins();
            }
        })
    }

    function fetchAdmins() {
        axios.get("http://localhost:3300/fetch-admins").then(response => {
            console.log(response.data);
            setAdmins(response.data);
        })
    }

    function changeStatus(username, status) {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Change Status!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("http://localhost:3300/update-status-admin", {
                    username, status
                })
                    .then(res => {
                        console.log(res.data);
                        if (res.data === "updated") {
                            fetchAdmins();
                        } else {
                            alert(res.data);
                        }
                    })
            }
        })

    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <section className="faq p-16">
                <div className="container">
                    <div className="heading">
                        <div className="left">
                            <h3 className="light-black">Manage Admins</h3>
                        </div>
                    </div>
                    <Button variant="primary" onClick={handleShow}>
                        <FaPlus/>
                    </Button>

                    {
                        admins.length > 0 ?
                            <table className={"table table-dark mt-3"}>
                                <thead>
                                <tr className={"text-center"}>
                                    <th>Sr. No.</th>
                                    <th>Username</th>
                                    <th>Full Name</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    admins.map((value, index) => {
                                        let {username, full_name, phone, status} = value
                                        return (
                                            <tr key={index} className={"text-center"}>
                                                <td>{index + 1}</td>
                                                <td>{username}</td>
                                                <td>{full_name}</td>
                                                <td>{phone}</td>
                                                <td>{status}</td>
                                                <td>
                                                    {
                                                        status === "active" ?
                                                            <button onClick={() => changeStatus(username, 'in-active')}
                                                                    className={"btn btn-3"}>In-active</button> :
                                                            <button className={"btn btn-success"}
                                                                    onClick={() => changeStatus(username, 'active')}>Active</button>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                            :
                            <p className={"alert alert-danger mt-3"}>No data found</p>

                    }
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className={"text-dark"}>Add New Admin</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form id={"form"} onSubmit={handleSubmit(add_admin)}>
                                <div className={"row"}>
                                    <div className={"col-lg-6"}>
                                        <div className="inputGroup mb-32">
                                            <input
                                                type="text" {...register('username', {required: "Username is required"})}
                                                id="username"/>
                                            <label htmlFor="username">Username</label>
                                            <ErrorMessage name={"username"} errors={errors}
                                                          render={({message}) => <p
                                                              className={"text-danger"}>{message}</p>}></ErrorMessage>

                                        </div>
                                    </div>
                                    <div className={"col-lg-6"}>
                                        <div className="inputGroup mb-32">
                                            <input
                                                type="password" {...register('password', {required: "Password is required"}, {
                                                minlength: {
                                                    value: 4,
                                                    message: "Enter at least 4 characters"
                                                }
                                            })} id="password"/>
                                            <label htmlFor="password">Password</label>
                                            <ErrorMessage name={"password"} errors={errors}
                                                          render={({message}) => <p
                                                              className={"text-danger"}>{message}</p>}></ErrorMessage>

                                        </div>
                                    </div>

                                </div>
                                <div className={"row"}>
                                    <div className={"col-lg-6"}>
                                        <div className="inputGroup mb-32">
                                            <input
                                                type="text" {...register('fullname', {required: "Full Name is required"})}
                                                id="fullname"/>
                                            <label htmlFor="fullname">Full Name</label>
                                            <ErrorMessage name={"fullname"} errors={errors}
                                                          render={({message}) => <p
                                                              className={"text-danger"}>{message}</p>}></ErrorMessage>

                                        </div>
                                    </div>
                                    <div className={"col-lg-6"}>
                                        <div className="inputGroup mb-32">
                                            <input
                                                type="number" {...register('phone', {required: "Phone No. is required"})}
                                                id="cpassword"/>
                                            <label htmlFor="phone">Phone No.</label>
                                            <ErrorMessage name={"phone"} errors={errors}
                                                          render={({message}) => <p
                                                              className={"text-danger"}>{message}</p>}></ErrorMessage>

                                        </div>
                                    </div>
                                    div className="col-12">
                                    <button type="submit" className="cus-btn primary me-3">Submit</button>
                                    <button type="button" className="cus-btn danger" onClick={() => reset()}>Reset
                                    </button>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </section>

        </>
    )
}
export default ManageAdmins;