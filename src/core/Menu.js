import React,{Fragment} from "react";
import {Link,withRouter}from 'react-router-dom';
import {isAutheticated,signout}from '../auth/helper'

const currenTab=(history,path)=>{
    if(history.location.pathname===path){
        return {color:"#2ecc72"}
    }
    else{
        return {color:"#FFFFFF"}
    }
}


const Menu=({history,pathname,location})=>(
    <div>
       <ul className="nav nav-tabs bg-dark">
           <li className="nav-item">
                <Link style={currenTab(history,"/")} className="nav-link" to="/">
                    Home
                </Link>
           </li>
           <li className="nav-item">
               <Link style={currenTab(history,"/cart")} className="nav-link" to="/cart">
                    Cart
               </Link>
           </li>
           {isAutheticated()&&isAutheticated().user.role===0&&(
               <li className="nav-item">
               <Link  style={currenTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">
                    U.Dashboard
               </Link>
           </li>
           )}
          {isAutheticated()&&isAutheticated().user.role===1&&(
               <li className="nav-item">
               <Link style={currenTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                    Admin-Dashboard
               </Link>
           </li>
          )}
           
           {
               !isAutheticated()&&(
                <Fragment>
                        <li className="nav-item">
                            <Link style={currenTab(history,"/signup")} className="nav-link" to="/signup">
                                    Sign-up
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link style={currenTab(history,"/signin")} className="nav-link" to="/signin">
                                    Sign-in
                            </Link>
                        </li>
                </Fragment>
               )
           }

           {
               isAutheticated()&&(
                   <li className="nav-item">
                       <span className="nav-link text-warning" style={{cursor:"pointer"}}
                         onClick={()=>{
                             signout(()=>{
                                 history.push('/');
                             })
                         }}
                       >
                           sign-out
                       </span>
                   </li>
               )
           }
       </ul>
    </div>
)


export default withRouter(Menu);