import PublicNavbar from "./Components/PublicNavbar";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import {Link} from "react-router-dom";

let Blogs = () => {
    let [userblogs,setBlogs] = useState([]);
    let [status,setStatus] = useState(true);
    useEffect(()=>{
        axios.get("http://localhost:3300/fetch-blogs").then(res=>{
            console.log(res.data);
            setStatus(false)
            setBlogs(res.data);
        })
    })
    return (
        <>
            <PublicNavbar/>
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
                                    <h2 className="title">View all Blogs</h2>
                                    <ul className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Blogs</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section techwix-blog-grid-section section-padding">
                <div className="container">
                    <div className="techwix-blog-grid-wrap">
                        <div className="row">
                            {
                                status ?
                                    <ReactLoading type={"spinningBubbles"} color={"coral"}></ReactLoading>
                                    :
                                    userblogs.length > 0 ?
                                        userblogs.map((value,index)=>{
                                            let {blog_id,title,fullname,bdt,cat_name} = value;
                                            return(
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="single-blog">
                                                        <div className="blog-image">
                                                            <img src="/assets/images/blog/blog-2.jpg" alt=""/>
                                                            <div className="top-meta">
                                                                <span className="date"><span>{bdt}</span></span>
                                                            </div>
                                                        </div>
                                                        <div className="blog-content">
                                                            <div className="blog-meta">

                                                                <span><i className="fas fa-user"></i>{fullname}</span>
                                                            </div>
                                                            <h3 className="title">{title}</h3>
                                                            <div className="blog-btn">
                                                                <Link className="blog-btn-link" to={`/blog-details/${blog_id}`}>Read Full Blog<i className="fas fa-long-arrow-alt-right"></i></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        })
                                        : <div className={"alert alert-danger"}>No data found</div>
                            }
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default Blogs;