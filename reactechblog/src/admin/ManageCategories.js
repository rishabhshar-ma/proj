import {Button, Modal} from 'react-bootstrap';
import {ErrorMessage} from "@hookform/error-message";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {FaEdit, FaPlus,FaTimes} from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import ReactLoading from 'react-loading';


const ManageCategories = () => {
    let {register, handleSubmit, reset, formState: {errors}} = useForm()
    let [categories,setCategries] = useState([])
    const [show, setShow] = useState(false);
    let [status, setStatus] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleForm(data) {
        console.log(data);
        let {category} = data
        axios.post("http://localhost:3300/add-category",{
            category
        }).then(res=>{
            console.log(res.data);
            if(res.data==="inserted"){
                reset();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Category added successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                viewCategories()
            }
        })

    }
    let viewCategories = ()=>{
        axios.get("http://localhost:3300/view-categories").then(res=>{
            console.log(res.data)
            setStatus(false)
            setCategries(res.data);
        })
    }
    useEffect(() => {
        viewCategories();
    }, [])
    function delCategory(id){

        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get("http://localhost:3300/del-category/"+id).then(res=>{
                    console.log(res.data)
                    if(res.data ==="deleted"){
                        viewCategories()
                    }
                })
            }
        })

    }
    return (
        <>
            <section className="faq p-16">
                <div className="container">
                    <div className="heading">
                        <div className="left">
                            <h3 className="light-black">Manage Categories</h3>
                        </div>
                    </div>
                    <Button variant="primary" className={"mt-3 mb-3"} onClick={handleShow}>
                        <FaPlus/>
                    </Button>
                    {
                        status ?
                            <ReactLoading type={"spinningBubbles"} color={"coral"}></ReactLoading>
                            :
                            categories.length > 0 ?
                                <table className={"table table-dark"}>
                                    <thead>
                                    <tr className={"text-center"}>
                                        <th>Sr. No.</th>
                                        <th>Category Name</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        categories.map((value,index)=>{
                                            let {cat_id,cat_name} = value
                                            return(
                                                <tr key={index} className={"text-center"}>
                                                    <td>{index+1}</td>
                                                    <td>{cat_name}</td>
                                                    <td>
                                                        <button type={"button"} className={"btn btn-3"} onClick={()=>delCategory(cat_id)}><FaTimes/></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table> :
                                <p className={"alert alert-danger"}>No data found</p>
                    }
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className={"text-dark"}>Add New Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form id={"form"} onSubmit={handleSubmit(handleForm)}>
                                <div className={"row mb-4"}>
                                    <div className={"col-lg-12"}>
                                        <div className="single-form">
                                            <label htmlFor={"category"} className={"text-dark"}>Category</label>
                                            <input type={"text"}  {...register('category',{required:"Category Name is required"})}/>
                                            <ErrorMessage name={"category"} errors={errors}
                                                          render={({message}) => <p
                                                              className={"text-danger"}>{message}</p>}></ErrorMessage>

                                        </div>
                                    </div>
                                    <div className={"col-lg-12 mt-3"}>
                                        <div className="single-form">
                                            <button type={"submit"} className={"btn btn-1"}>Submit</button>
                                        </div>
                                    </div>

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
export default ManageCategories;