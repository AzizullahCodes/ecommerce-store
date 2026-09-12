
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import SignUp from "../../pages/sign-up/sign-up";
import LogIn from "../../pages/log-in/login";
import Home from "../../pages/home/home";
import Orders from "../../pages/orders/orders";
import Contact from "../../pages/contact/contact";
import YourCart from "../../pages/cart/cart";
import AddProducts from "../../pages/add-products/add-products";
import SettingPage from "../../pages/setting/setting";
// Route Guards
import PublicRoutes from "../public-routes/public-routes";
import ProtectedRoutes from "../protected-routes/protected-routes";

const AppRoutes = () => {
  // const isLoggedIn = localStorage.getItem("users"); 
  const check = localStorage.getItem('loggedInUser')

  return (
    <Routes>

      {/* PUBLIC ROUTES (only for non-logged users) */}
      <Route element={<PublicRoutes />}>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        
      </Route>

      {/* PROTECTED ROUTES (only for logged users) */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<YourCart/>}/>
        <Route path="/add-products" element={<AddProducts/>}/>
        <Route path="/setting" element={<SettingPage/>}/>
     
      </Route>


      {/* catch all routes path */}
      <Route
        path="*"
        element={
          check ? (
            <Navigate to="/" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
       /> 

    </Routes>
  );
};

export default AppRoutes;