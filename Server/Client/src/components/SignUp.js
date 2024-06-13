import React from "react";

import logo from "../images/logo.png";

import goback from "../images/goback.png"

import Styles from "./signup.module.css";

import axios from "axios";

import { toggleRegisterPage } from "../features/common/commonSlice";

import { useDispatch } from "react-redux";

const SignUp = () => {

  const dispatch = useDispatch();

  const closeRegister = () =>{
    dispatch(toggleRegisterPage());
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    
    if(e.target.password.value === e.target.confirm_password.value){

      axios.post("https://kls-digibuy-i4jn.onrender.com/user/register",{data:{

        username:e.target.username.value,
        email:e.target.user_email.value,
        password:e.target.password.value,
        usertype:e.target.type_of_user.value

      }})
      .then(dispatch(toggleRegisterPage()))
      .catch(err=> console.log(err))

    }
  }
  return (
    <>
      <div className={Styles.outer_div}>

          <img className={Styles.app_name} src={logo}/>
          
          <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" name="username" placeholder="Enter name"/>
            <input type="email" name="user_email" placeholder="Enter email"/>
            <input type="password" name="password" placeholder="Enter password"/>
            <input type="password" name="confirm_password" placeholder="Confirm password"/>
            <div className={Styles.usertype}>
              <input type="radio" value="User" name="type_of_user" required/><p>User</p>
              &nbsp;
              &nbsp;
              &nbsp;
              <input type="radio" value="Seller" name="type_of_user" required/><p>Seller</p>
            </div>
            <button type="submit">Register</button>
          </form>
      </div>
      <img src={goback} className={Styles.goback_image} onClick={closeRegister}/>
    </>
  )
};

export default SignUp;
