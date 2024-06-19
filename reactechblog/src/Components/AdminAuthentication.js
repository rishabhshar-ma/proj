import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AdminAuthentication = ({Component}) => {
    // console.log(Component);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3300/admin-check-authentication").then(response => {
            console.log(response.data);
            if (response.data === "fails") {
                navigate("/admin-login")
            } else {
                console.log(response.data);
            }
        })
    })
    return (
        <>
            <Component/>
        </>
    )
}
export default AdminAuthentication;