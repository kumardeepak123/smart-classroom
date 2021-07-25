import React from 'react';
import './NavigationItems.css'
import NavigationItem from '../NavigationItem/NavigationItem'

const navigationItems = () => {
    return (  
        <ul className="NavigationItems">
            <button type="button" class="btn btn-warning">Create Organization</button>
            <NavigationItem link="/Home"  >Home</NavigationItem>
            <NavigationItem link="/Signup"  >Signup</NavigationItem>
            <NavigationItem link="/Signin" >Signin</NavigationItem>
            <NavigationItem link="/Signout" >Signout</NavigationItem>
        </ul>
    );
}
 
export default navigationItems;