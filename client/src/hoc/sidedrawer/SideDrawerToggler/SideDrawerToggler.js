import React from 'react';
import './SideDrawerToggler.css'
const sideDrawerToggler = (props) => {


    return (  
        <div className="DrawerToggle" onClick={props.toggleClick}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
 
export default sideDrawerToggler;