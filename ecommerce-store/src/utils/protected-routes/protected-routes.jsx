import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRoutes = () => {
  const check = localStorage.getItem('loggedInUser');
  return(
     check ? <Outlet /> : <Navigate to='/login' />
  )
}

export default ProtectedRoutes;