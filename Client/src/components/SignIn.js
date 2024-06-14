import React from "react";

import logo from "../images/logo.png";

import goback from "../images/goback.png"

import Styles from "./signin.module.css";

import Cookies from 'universal-cookie';

import axios from "axios";

import { toggleSignInPage,setLoggedInUser } from "../features/common/commonSlice";

import { useDispatch } from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch();
  
  const cookies = new Cookies();

  const closeSignin = () =>{
    dispatch(toggleSignInPage());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://kls-digibuy.onrender.com/user/signin",{data:{
      email:e.target.user_email.value,
      password:e.target.password.value,
      usertype:e.target.usertype.value
    }})
    .then(result=>{
      dispatch(setLoggedInUser(result.data.username))
      dispatch(toggleSignInPage())
      cookies.set("currentUser",result.data.username)
      cookies.set("currentUserMail",result.data.email)
      cookies.set("currentUserType",result.data.usertype)
    })
    .catch(err=> console.log(err))
  }
  return (
    <>
      <div className={Styles.outer_div}>
          <img className={Styles.app_name} src={logo}/>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input type="email" name="user_email" placeholder="User email"/>
            <input type="password" name="password" placeholder="Enter password"/>
            <input type="hidden" name="usertype" value="User"/>
            <button type="submit">Log in</button>
          </form>
      </div>
      <img src={goback} className={Styles.goback_image} onClick={closeSignin}/>
    </>
  )
};

export default SignIn;
