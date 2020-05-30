import React,{useState,useEffect}from 'react';
import{isAutheticated}from'../auth/helper';
import{cartEmpty,loadCart}from './helper/cartHelper';
import {Link}from 'react-router-dom';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';


const StripeCheckout=({products,setReload,reload})=>{
       const [data,setData]=useState({
           loading:false,
           success:false,
           error:'',
           address:''
       })

       const {user,token}=isAutheticated();

       const getFinalAmount=()=>{
           let amount=0;

           products.map((product,index)=>{
               amount+=product.price;
           })

           return amount;
       }

       const makePayment = token => {
        const body = {
          token,
          products
        };
        const headers = {
          "Content-Type": "application/json"
        };
        return fetch(`${API}/stripepayment`, {
          method: "POST",
          headers,
          body: JSON.stringify(body)
        })
          .then(response => {
            console.log(response);
            //call further methods
          })
          .catch(error => console.log(error));
      };

       const showStripeButton=()=>{
           return isAutheticated()?
           (
           <StripeCheckoutButton
           stripeKey="pk_test_vWzoeqPgX51v1Wj2gTAoVzoj00bzUFiBp8"
           token={makePayment}
           amount={getFinalAmount() * 100}
           name="Buy Tshirts"
           shippingAddress
           billingAddress
           >
                <button className="btn btn-success">Pay with stripe</button>
           </StripeCheckoutButton>
           )
           :
           (
               <Link to="/signin">
                    <button className="btn btn-warning">sign-in</button>              
               </Link>
           )
       }

       return(
           <div>
               <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
               {showStripeButton()}
           </div>
       )
}


export default StripeCheckout;