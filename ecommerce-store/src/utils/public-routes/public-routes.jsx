//publicr-routes.jsx
import React from "react";
import Swal from "sweetalert2";
import { Outlet,Navigate } from "react-router-dom";
const PublicRoutes = ()=>{
    const isDataExisted = localStorage.getItem('users')
    let check = localStorage.getItem('loggedInUser');

    return(
        // isDataExisted ? <Navigate to='/'/> : <Outlet/>  
        check ? <Navigate to='/'/> : <Outlet/>

    )

}
export default PublicRoutes;