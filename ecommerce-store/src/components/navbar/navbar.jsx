// //navbar.jsx

import React, { useEffect, useState } from "react";
import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import "./navbar.css";
import { jsxDEV } from "react/jsx-dev-runtime";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartLength,setCartLength] = useState([])

//   //useEffect 
//   useEffect(()=>{
//     let get = localStorage.getItem('YourOrders');
//     if(get){
//       let jsonData = JSON.parse(get);
//       jsonData && setCartLength(jsonData)
//     }

//   },[])

//   // update auto when click on procced to cart

// useEffect(() => {
//   const loadCartLength = () => {
//     const get = localStorage.getItem('YourOrders');
//     if (get) {
//       const jsonData = JSON.parse(get);
//       jsonData && setCartLength(jsonData);
//     }
//   };

//   loadCartLength(); // initial load on mount

//   window.addEventListener('cartUpdated', loadCartLength);

//   return () => {
//     window.removeEventListener('cartUpdated', loadCartLength);
//   };
// }, []);


useEffect(()=>{
  // step A: is function ko bana diya taaki dubara use kar sakein
  const checkCart = () => {
    let get = localStorage.getItem('YourOrders');
    if(get){
      let jsonData = JSON.parse(get);
      jsonData && setCartLength(jsonData)
    }
  }

  // step B: page load hote hi ek baar check karo (jaisa pehle tha)
  checkCart();

  // step C: Home se signal aaye toh dubara check karo
  window.addEventListener('cartUpdated', checkCart);

  // step D: cleanup - component hatne par listener hata do
  return () => {
    window.removeEventListener('cartUpdated', checkCart);
  }
},[])

  return (
    <nav className="navbar">

      <div className="nav-container">

        {/* Logo */}
        <Link to="/" className="logo">
          Auth<span>Flow</span>
        </Link>

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav Links */}
        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>

           <li>
            <Link to="/add-products">Add Products</Link>
          </li>

          <li>
            <Link to="/orders">Orders</Link>
          </li>
          
           <li>
            <Link to="/contact">Contact</Link>
          </li>
         
         {/* <li>
          <Link to='/cart'>Cart
          {
            cartLength.length > 0 ?(<sup>{cartLength.length}</sup>) : null
          }</Link>
         </li> */}


           <li>
          <Link to='/cart' style={{ position: 'relative' }}>Cart
         
         {cartLength.length > 0 && (
    <MDBBadge color='danger' className="fs-7" notification pill style={{ position: 'absolute', top: '-8px', right: '-10px' }}>
      {cartLength.length}
    </MDBBadge>
  )}
        
          </Link>
         </li> 

          <div className="nav-buttons">
            <Link to="/login" className="login-btn">
              Log In
            </Link>

            <Link to="/sign-up" className="signup-btn">
              Sign Up
            </Link>

             <Link to="/setting" className="signup-btn">
              setting
            </Link>
          </div>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;