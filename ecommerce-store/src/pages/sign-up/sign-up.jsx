

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./sign-up.css";

const SignUp = () => {
        const navigate = useNavigate();
    //formState
    const [formState,setFormState] = useState({
        name : '',
        email : '',
        password : ''
    });
    //useRef
    const passRef = useRef(null)
    //formState handler function
    const formStateHandler = ()=>{
      if(
        formState.name == ''|| formState.email == '' || formState.password == ''
      ){
        Swal.fire("Plz enter your data!")

      }
      else{
        let users = JSON.parse(localStorage.getItem('users')) || [];
      let isExisted = users.some((item)=>{
        return(
          item.email == formState.email
        )
      })
      //apply condition
      if(isExisted){
    Swal.fire({
  title: "user already existed with this email you entered now!",
  icon: "success",
  draggable: true
});        navigate('/login')
      }
else{
   //creating an object to storing in localstorage
        let obj = {
            name :formState.name,
            email : formState.email,
            password : formState.password
        }
        users.push(obj)
        // set in local storage
        localStorage.setItem('users',JSON.stringify(users))
Swal.fire({
  title: "You have sign up successfully!",
  icon: "success",
  draggable: true
});        navigate('/login')

}
      }
      // clearinputs 
      setFormState({
        name : '',
        email : '',
        password : ''
      })
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
    <div className="signup-container">
      <div className="signup-card">

        <div className="logo">
          <div className="logo-circle"></div>
        </div>

        <h1>Create an account</h1>
        <div className="signup-form">

          <div className="input-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name"
                        value={formState.name}
            onChange={(e)=>{
                setFormState(
                {
                    ...formState,
                    name : e.target.value
                }
                )

            }} />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email"
            autoComplete="new-email"
                        onChange={(e)=>{
                setFormState({
                    ...formState,
                    email : e.target.value
                })
            }} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-box">
              <input type="password" placeholder="Create a password"
              autoComplete="new-password"
                          onChange={(e)=>{
            setFormState({
                ...formState,
                password : e.target.value
            })
            }} ref={passRef} />
              <span  onClick={passwordHandler}>👁</span>
            </div>
          </div>

          <div className="requirements">
            <p>✔ Must be at least 8 characters</p>
            <p>✔ Must contain one special character</p>
          </div>

          <button className="signup-btn" onClick={formStateHandler}>
            Create Account
          </button>

          <p className="login-text">
            Already have an account?
            <Link to='/login' style={{textDecoration:'none'}}><span> Log in</span></Link>
            
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUp;