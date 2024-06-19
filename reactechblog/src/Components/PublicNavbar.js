import {Link} from "react-router-dom";
const PublicNavbar = ()=>{
    return(
        <>
            <div id="header" className="section header-section-02.sticky header-section header-section-02">

                <div className="container">

                    <div className="header-wrap">

                        <div className="header-logo">
                            <a className="logo-black" href="/"><img src="/assets/images/logo.png" alt=""/></a>
                            <a className="logo-white" href="/"><img src="assets/images/logo-2.png" alt=""/></a>
                        </div>

                        <div className="header-menu d-none d-lg-block">
                            <ul className="main-menu">
                                <li className="active-menu">
                                    <Link to={"/"}>Home</Link>
                                </li>
                                <li>
                                    <Link to="/about-us">About Us</Link>
                                </li>

                                <li><Link to="/blogs">Blogs</Link></li>
                            </ul>
                        </div>

                        <div className="header-meta">

                            <div className="header-cart dropdown">
                                {/*<button className="cart-btn" data-bs-toggle="dropdown">
                                    <i className="flaticon-shopping-cart"></i>
                                    <span className="count">0</span>
                                </button>*/}

                                {/*<div className="dropdown-menu dropdown-cart">

                                    <div className="cart-items">

                                        <div className="single-cart-item">
                                            <div className="item-image">
                                                <img src="/assets/images/shop-cart-1.jpg" alt="cart"/>
                                            </div>
                                            <div className="item-content">
                                                <h4 className="title"><a href="#">Apple Iphone X</a></h4>
                                                <span className="quantity">2 x $59.99</span>
                                            </div>
                                            <button className="btn-close"></button>
                                        </div>
                                        <div className="single-cart-item">
                                            <div className="item-image">
                                                <img src="assets/images/shop-cart-2.jpg" alt="cart"/>
                                            </div>
                                            <div className="item-content">
                                                <h4 className="title"><a href="#">Sony Xperia Tablet</a></h4>
                                                <span className="quantity">2 x $59.99</span>
                                            </div>
                                            <button className="btn-close"></button>
                                        </div>

                                        <div className="single-cart-item">
                                            <div className="item-image">
                                                <img src="/assets/images/shop-cart-3.jpg" alt="cart"/>
                                            </div>
                                            <div className="item-content">
                                                <h4 className="title"><a href="#">Camera Digital</a></h4>
                                                <span className="quantity">2 x $59.99</span>
                                            </div>
                                            <button className="btn-close"></button>
                                        </div>

                                    </div>

                                    <div className="cart-total">
                                        <span className="label">Subtotal:</span>
                                        <span className="value">0</span>
                                    </div>

                                    <div className="cart-btns">
                                        <a className="btn" href="#">View Cart</a>
                                        <a className="btn btn-2" href="#">Checkout</a>
                                    </div>
                                </div>*/}

                            </div>

                            {/*<div className="header-search">
                                <a className="search-btn" href="#"><i className="flaticon-loupe"></i></a>
                                <div className="search-wrap">
                                    <div className="search-inner">
                                        <i id="search-close" className="flaticon-close search-close"></i>
                                        <div className="search-cell">
                                            <form action="#">
                                                <div className="search-field-holder">
                                                    <input className="main-search-input" type="search"
                                                           placeholder="Search Your Keyword..."/>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>*/}


                            <div className="header-btn d-none d-xl-block">
                                <Link className="btn btn-3" to="/user-LoginRegister">Login/Register</Link>
                            </div>

                            <div className="header-toggle d-lg-none">
                                <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>

                        </div>


                    </div>


                </div>
            </div>
        </>
    )
}
export default PublicNavbar;