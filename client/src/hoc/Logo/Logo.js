import React from 'react';
import BrandLogo from '../../images/smartClass.png'
import './Logo.css'

const logo = (props) => {

    return ( 
        <div className= "Logo"   style={{ height: props.height }}>
            <img src={BrandLogo}   alt="logo" />
        </div>
    );
}
 
export default logo;
