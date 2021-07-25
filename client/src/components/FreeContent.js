import React from 'react';
import  "../css/FreeContent.css"
import TechnicalLogo from "../images/technical.png";
import AptitudeLogo from "../images/aptitude.png";
import LiteratureLogo from "../images/literature.png";


const FreeContent = (props) => {
    return ( <div className=" freeContent">
    
    <div class="row">
      <div class="col-lg-4 feature-box">
        <a href="https://www.careerride.com/Engineering-questions-answers.aspx" >
        <img src={TechnicalLogo} alt="technical"/>
        </a>
        <h3>Technical</h3>
        <p>Get the lattest technical contentt</p>                   
      </div>

      <div class="col-lg-4 feature-box">
         <a href="https://www.careerride.com/online-aptitude-test.aspx" >
         <img src={AptitudeLogo} alt="aptitude"/>
         </a>       
        <h3>Aptitude</h3>
        <p>sharp your mind with our best hand picked aptitude content </p>

      </div>
      <div class="col-lg-4 feature-box">
        <a href="https://www.careerride.com/online-general-knowledge-test.aspx" >
        <img src={LiteratureLogo} alt="literature"/>
        </a>       
        <h3>Literature</h3>
        <p>Get the literature content</p>

      </div>
    </div>
 
      
        </div> );
}
 
export default FreeContent;