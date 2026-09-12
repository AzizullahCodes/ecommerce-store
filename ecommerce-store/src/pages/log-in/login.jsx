//login.jsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./login.css";

const LogIn = () => {
        const navigate = useNavigate();
        const passRef = useRef(null)
    //formState
    const [formState,setFormState] = useState({
        email : '',
        password : ''
    });
    //formState handler function
    const formStateHandler = () => {
  if (formState.email === '' || formState.password === '') {
   Swal.fire({
  title: "Please enter your data!",
  icon: "warning",
});
    return;
  }

  const getData = JSON.parse(localStorage.getItem('users')) || [];
  const getObject = getData.find((item) => item.email === formState.email);

  if (!getObject) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No account found with this email. Sign up first!',
    });
    setFormState({email: '',password : ''})
    return;
  }

  if (getObject.password === formState.password) {
    Swal.fire({
      title: 'You have Logged In Successfully!',
      icon: 'success',
      draggable: true,
    
     
    })
    //storing in local storage for accessing in homepage
    localStorage.setItem('loggedInUser',JSON.stringify(getObject))
    navigate('/')
    
    
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Incorrect password. Try again!',
      
    });
  }
  
}
//password handle funciton 
const passwordHandler = () => {
  if (passRef.current.type === "password") {
    passRef.current.type = "text"
  } else {
    passRef.current.type = "password"
  }
}
  return (
    <div className="login-container">
      <div className="login-card">

        <div className="logo">
          <div className="logo-circle"></div>
        </div>

        <h1>Welcome back</h1>
        <p className="subtitle">
          Enter your credentials to access your account.
        </p>
        <div className="login-form">

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="new-email"
              value={formState.email}
                          onChange={(e)=>{
                setFormState({
                    ...formState,
                    email : e.target.value
                })
            }}
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="password-box">
              <input
                type="password"
                placeholder="Enter your password"
                autoComplete="new-password"
                value={formState.password}
                            onChange={(e)=>{
            setFormState({
                ...formState,
                password : e.target.value
            })
            }}
            ref={passRef}
              />
              <span onClick={passwordHandler}>👁</span>
            </div>
          </div>

          <button className="login-btn" onClick={formStateHandler}>
            Log in
          </button>

          <p className="signup-text">
            Don't have an account?
            <Link to='/sign-up' style={{textDecoration:'none'}}><span> Sign up</span></Link>
            
          </p>

        </div>

      </div>
    </div>
  );
};

export default LogIn;