import React from "react";
import Swal from 'sweetalert2'; 
// import './home.css';
import './setting.css';
import { useNavigate } from "react-router-dom";
const SettingPage = ()=>{
  const navigate = useNavigate('')
  const logOutHandler = ()=>{
  localStorage.removeItem('loggedInUser')
  //swal alert
   Swal.fire({
        title: 'You have logged out successfully!',
        icon: 'success',
        draggable: true,
      
       
      }).then(()=>{
        navigate('/login')
      })
 
  }
  //delete account 
  const deleteAccountFun = ()=>{
    let users = JSON.parse(localStorage.getItem('users'));
  let loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
  console.log(loggedUser)
  console.log(users);
  let requiredIndex = users?.findIndex((item)=> item.email == loggedUser.email);
  console.log(requiredIndex)
  users.splice(requiredIndex,1);
  localStorage.setItem('users',JSON.stringify(users))
  localStorage.removeItem('loggedInUser')
  //swal alert
   Swal.fire({
        title: 'Your account has been deleted permanently!',
        icon: 'error',
        draggable: true,
      }).then(()=>{
        navigate('/login')
      })
 
  }
  return(
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-heading">Welcome Home</h1>
        <p className="home-subtext">Manage your account settings below</p>
        
        <div className="button-group">
          <button className="btn-logout" onClick={logOutHandler}>
            Log Out
          </button>
          
          <button className="btn-delete" onClick={deleteAccountFun}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
export default SettingPage;


