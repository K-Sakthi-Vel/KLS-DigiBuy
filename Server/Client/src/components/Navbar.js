import React, { useEffect} from "react";

import Styles from "./navbar.module.css";

import Cookies from 'universal-cookie';

import logo from "../images/logo.png";

import user from "../images/user.png";

import axios from "axios";

import logout from "../images/logout.png";

import { selectValue,
         setLoggedInUser,
         setProducts,
         setSearchContent,
         setSearchResults,
         toggleRegisterPage,
         toggleSellerSignInPage,
         toggleSignInPage
} from "../features/common/commonSlice";

import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  // initialize cookies
  const cookies = new Cookies();
  // accessing app store value
  const {loggedInUser}=useSelector(selectValue);
  // for dispatch actions
  const dispatch = useDispatch();
  // dispatching action and open register page
  const openRegister = () => {

    dispatch(toggleRegisterPage());

  }
  // dispatching action and open signin page
  const openSignin = () => {

    dispatch(toggleSignInPage());

  }
// dispatching action and open seller's signin page
  const openSellerSignin = () => {

    dispatch(toggleSellerSignInPage());

  }
  // dispatching action for signout the user
  const signOut = () => {
    // remove all the cookies
    cookies.remove("currentUser")
    cookies.remove("currentUserMail")
    cookies.remove("currentUserType")

    dispatch(setLoggedInUser(""))

  }
  // function for handle the form submission
  const handleSubmit = (e) => {

    e.preventDefault();

    axios.post("http://localhost:4004/user/search_products",{content:e.target.search_content.value})
        .then(result => {
          dispatch(setSearchResults(result.data.result))
          dispatch(setSearchContent(result.data.content))
        })
        .catch(err => console.log(err))
  }
  
  function fetchProducts(){
    axios.post("http://localhost:4004/user/get_products")
    .then(result => dispatch(setProducts(result.data)))
    .catch(err => console.log(err))
  }
  
  // setting current logged in user
  useEffect(()=>{

    const cookieData = cookies.get("currentUser")

    if(cookieData !== undefined){

      dispatch(setLoggedInUser(cookieData));

    }
    // calling fetch product function
    fetchProducts();

  },[]);

  return (

    <div className={Styles.navbar}>

        <img className={Styles.app_name} src={logo}/>

        <form className={Styles.search_form} onSubmit={(e)=>handleSubmit(e)}>

          <input type="text" name="search_content" placeholder="Looking for something!"/>

          <button type="submit">Look out</button>

        </form>

        {
          loggedInUser===""?
            <div className={Styles.logon}>
              <button className={Styles.sign_up} onClick={openRegister}>Register</button>
              <p className={Styles.divider}> | </p>
              <button className={Styles.sign_in} onClick={openSignin}>I'm user</button>
              <p className={Styles.divider}> | </p>
              <button className={Styles.sign_in} onClick={openSellerSignin}>I'm seller</button>
            </div>
          :
            <>
              <p className={Styles.loggedinusername}>{loggedInUser}</p>
              <img className={Styles.userprofile} src={user}/>
              &nbsp;
              &nbsp;
              <img className={Styles.logout} src={logout} onClick={signOut}/>
            </>
        }
    
    </div>
  )
};

export default Navbar;
