import React from 'react';
import './toolbar.css'
import BrandLogo from '../Logo/Logo'
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'
import SideDrawerToggler  from '../sidedrawer/SideDrawerToggler/SideDrawerToggler'

const toolBar = (props) => {
    return (  
        <header className="Toolbar">
            <SideDrawerToggler toggleClick={props.toggleClicked}/>
            {/*<BrandLogo/> */}
            <nav className="DesktopOnly">
            <NavigationItems  />
            </nav> 
            
        </header>
    );
}
 
export default toolBar;