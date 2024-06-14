import React, { useEffect} from "react";

import Styles from "./main.module.css";

import Cookies from 'universal-cookie';

import { useDispatch, useSelector } from "react-redux";

import { selectValue } from "../features/common/commonSlice";

import SellerMain from "./SellerMain";

const Main = () => {
  // initialing cookies
  const cookies = new Cookies();
  // for dispatch actions
  const dispatch = useDispatch();
  // accessing values from app store
  const {products,searchResults,searchContent}=useSelector(selectValue);

  // if logged in user was a Seller
  if(cookies.get("currentUserType") === "Seller"){

    return(
      <SellerMain/>
    )

  }

  return (

    <div className={Styles.main}>
      {/* This div for showing categories of products */}
      <div className={Styles.show_category}>
        {/* search result message */}
        {
          searchResults.length>0?
            <p className={Styles.search_result_message}>Search results for "{searchContent}"</p>
          :
            null
        }

      </div>

      <div className={Styles.products_list}>
        {/* listing search results */}
        {searchResults.length===0?
          products.map((item,i)=>(
              <div className={Styles.a_product} key={i}>
                  <p className={Styles.name_of_product}>{item.product_name}</p>
                  <img src={require(`../images/Products/${item.filename}`)}/>
                  <div className={Styles.details}>
                      <p className={Styles.price}>{item.product_price}</p>
                      <p className={Styles.rating}>{item.product_rating}</p>
                  </div>
              </div>
          ))
          :
          searchResults.map((item,i)=>(
            <div className={Styles.a_product} key={i}>
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
  )
};

export default Main;
