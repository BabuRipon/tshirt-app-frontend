import React,{useState} from "react";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { Redirect } from "react-router-dom";

const Card = ({ product,addToCart=true,removeFromCart=false ,
  setReload 
  // setReload= f=>f
  ,reload=undefined}) => {

const [redirect, setRedirect] = useState(false);

const cartTitle=product?product.name:'A photo from pexel';
const cartPrice=product?product.price:'Default price';
const cartDescription=product?product.description:'A default description'

const AddToCart=()=>{
  addItemToCart(product,()=>setRedirect(true))
}

const getARedirect=redirect=>{
     if(redirect){
       return <Redirect to="/cart" />
     }
}

const showAddToCart=addToCart=>{
    return(
        addToCart&&(
            <button
              onClick={AddToCart}
              className="btn btn-block btn-outline-success mt-2 mb-2"
            >
              Add to Cart
            </button>
        )
        
    )
}


const showRemoveFromCart=removeFromCart=>{
    return(
        removeFromCart&&(
            <button
              onClick={() => {
                removeItemFromCart(product._id)
                setReload(!reload)
              }}
              className="btn btn-block btn-outline-danger mt-2 mb-2"
            >
              Remove from cart
            </button>
        )
    )
}



    
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap mt-3">
          {cartDescription}
        </p>
  <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
        <div className="row">
          <div className="col-12">
              {showAddToCart(addToCart)}
          </div>
          <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;