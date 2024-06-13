import React, { useEffect, useRef, useState } from "react";

import Styles from "./sellermain.module.css";

import Cookies from 'universal-cookie';

import sellers from "../data/Sellers";

import contact from "../images/contact.png";

import trash from "../images/trash.png";

import edit from "../images/edit.png";

import axios from "axios";

import location from "../images/location.png";

import { selectValue,
    toggleAddProductPage,
    setSellerProducts,
    toggleEditPage } from "../features/common/commonSlice";

import { useSelector, useDispatch } from 'react-redux';

const SellerMain = () => {

  const cookies = new Cookies();

  const {showAddProduct,sellerProducts,showEdit}= useSelector(selectValue);
  //   setting current editing product id to be passed
  const [currentEdit, setCurrentEdit] = useState("");

  //   ref for input fields
  const editPageProductName = useRef(null);

  const editPageProductPrice= useRef(null);

  const editPageProductRating = useRef(null);

  const dispatch = useDispatch();

  const sellername = cookies.get("currentUser");

  //   function for handle submission
  const handleSubmit = (e) =>{

    e.preventDefault();
    // axios post request to server side to add product
    axios.post("http://localhost:4004/seller/add_product",{data:{
        sellername:e.target.sellername.value,
        name:e.target.product_name.value,
        price:e.target.price.value,
        rating:e.target.rating.value,
        category:e.target.category.value,
        filename:e.target.filename.value,
    }})
    .then(e.target.product_name.value="",
        e.target.price.value="",
        e.target.rating.value="",
        e.target.category.value="",
        e.target.filename.value="",
    )
    .then(()=>
        axios.post("http://localhost:4004/seller/get_products",{seller:sellername})
        .then(result => dispatch(setSellerProducts(result.data)))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

  };
     
  const editProduct = (product) =>{

    dispatch(toggleEditPage());

    setCurrentEdit(product._id);

    editPageProductName.current.value=product.product_name;
    editPageProductPrice.current.value=product.product_price;
    editPageProductRating.current.value=product.product_rating;

  }

  const deleteProduct = async(product) =>{

    await axios.post("http://localhost:4004/seller/delete_product",{id:product._id})
    .then(result => 
        axios.post("http://localhost:4004/seller/get_products",{seller:sellername})
        .then(result => dispatch(setSellerProducts(result.data)))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))


    
  }

  const hadnleEdit = (e)=>{

    axios.post("http://localhost:4004/seller/edit_product",{data:{
        id:currentEdit,
        product_name:e.target.product_name.value,
        product_price:e.target.price.value,
        product_rating:e.target.rating.value
    }})
    .then(result => dispatch(toggleEditPage()))
    .catch(err => console.log(err))

  }

  useEffect(()=>{

    axios.post("http://localhost:4004/seller/get_products",{seller:sellername})

    .then(result => dispatch(setSellerProducts(result.data)))

    .catch(err => console.log(err))

  },[])

  return (

    <div className={Styles.sellermain}>

        <div className={Styles.seller_details}>

        {
            sellers.map((item)=>{
                if(sellername === item.name){
                    return(
                        <>
                            <img className={Styles.seller_pic} src={require(`../images/Sellers/${sellername.toLowerCase()}.png`)}/>
                            <p className={Styles.seller_name}>{item.name}</p>
                            <br></br>
                            <div className={Styles.address}>
                                {
                                    item.adderss.map((line)=>{

                                        return <> {line} <br></br></>
                                    })
                                }
                            </div>
                            <div className={Styles.location_and_contact}>
                                <img  src={location}/>
                                <p>{item.location}</p>
                            </div>
                            &nbsp;
                            <div className={Styles.location_and_contact}>
                                <img src={contact}/>
                                <p>{item.contact}</p>
                            </div>
                            <button> Send mail</button>
                        </>
                    )

                }
            })
        }
        
        </div>
        {
            showAddProduct?
            <div className={Styles.add_product_div}>
                <p className={Styles.heading}> Product Details</p>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" name="product_name" placeholder="Product name"/>
                    <input type="number" name="price" placeholder="Product price"/>
                    <input type="number" name="rating" max="5" placeholder="Product rating"/>
                    <input type="text" name="category" placeholder="Product category"/>
                    <input type="text" name="filename" placeholder="Image name with extension"/>
                    <input type="hidden" name="sellername" value={sellername}/>
                    <button type="submit">Create product</button>
                </form>
                <div className={Styles.close_button}
                    onClick={()=>dispatch(toggleAddProductPage())}>X</div>
        
            </div>
            :
            <div className={Styles.seller_products}>
                <div className={Styles.nav}>
                    <p>Seller Product's</p>
                    <button className={Styles.add_product}
                            onClick={()=>dispatch(toggleAddProductPage())}
                    >
                        Add product
                    </button>
                </div>
                <div className={Styles.products_list}>
                    {
                        sellerProducts.map((item,i)=>(
                            <div className={Styles.a_product} key={i}>
                                <div className={Styles.edit_delete}>
                                    <img src={edit} onClick={()=>editProduct(item)}/>
                                    <img src={trash} onClick={()=>deleteProduct(item)}/>
                                </div>
                                
                                <p className={Styles.name_of_product}>{item.product_name}</p>
                                <img src={require(`../images/Products/${item.filename}`)}/>
                                <div className={Styles.details}>
                                    <p className={Styles.price}>{item.product_price}</p>
                                    <p className={Styles.rating}>{item.product_rating}</p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

        }
        <div className={Styles.edit_product} style={{visibility:showEdit?"visible":"hidden"}}>
            <p>Update</p>
            <form onSubmit={(e)=>hadnleEdit(e)}>
                <input ref={editPageProductName} type="text" name="product_name" placeholder="Name"/>
                <input ref={editPageProductPrice} type="number" name="price" placeholder="Price"/>
                <input ref={editPageProductRating} type="number" name="rating" placeholder="Rating"/>
                <button type="submit">Update</button>
            </form>
            <div className={Styles.close_button_edit}
            onClick={()=>dispatch(toggleEditPage())}>X</div>
        </div>
    </div>
  )
};

export default SellerMain;
