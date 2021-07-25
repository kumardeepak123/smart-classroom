import React from "react";
import  BrandLogo from "../Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import   "./sideDrawer.css";
import BackDrop from '../backdrop/Backdrop'
import { NavLink } from "react-router-dom";
import "../Navigation/NavigationItem/NavigationItem.css"
import ProfileLogo from '../../images/person.jpg'


const sideDrawer = (props) => { 

  let attachClasses =[ 'SideDrawer' , 'Open']
  if(!props.Open)
   {
       attachClasses= [ 'SideDrawer' , 'Close']
   }
 




  return (
    <React.Fragment>
      <BackDrop show={props.Open} removeBackdrop={props.backDropRemove} />
    <div className= { attachClasses.join(' ') }>
      <div style={{marginTop:'10px' ,marginBottom:'20px' ,height:'13%', textAlign:"center"}}>
        <img style={{height:"100%", borderRadius:"50%"}} src={ProfileLogo} alt="ProfileLogo"/>
      </div>
      <nav style={{textAlign:"center", width:"100%"}}>
        <button className="btn btn-warning">Create Organisation</button>
          <div style={{marginTop:"20px"}}>
          <li className="NavigationItem" >
          <NavLink to="/Dashboard"  activeClassName="active">
          Dashboard
          </NavLink>
          </li>
          <li className="NavigationItem" >
         <NavLink to="/Home"  activeClassName="active">
          Home
         </NavLink>
          </li>
          <li className="NavigationItem" >
         <NavLink to="/Signup"  activeClassName="active">
          Signup
         </NavLink>
          </li>
          <li className="NavigationItem" >
          <NavLink to="/Signin"  activeClassName="active" >
          Signin
         </NavLink>
          </li>
          <li className="NavigationItem" >
          <NavLink to="/Signout"  activeClassName="active" >
          Signout
         </NavLink>
          </li> 
          </div>      
      </nav>
    </div>
    </React.Fragment>
  );
};

export default sideDrawer;
