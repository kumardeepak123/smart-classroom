import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faFacebook,
    faTwitter,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import './footer.css'
function Footer() {
    return (
        <footer>
            <div className="row container-fluid mx-auto py-3 " style={{backgroundImage:"linear-gradient(#4b4721, #353325)"}}>
                <div className="col-md-3 mb-3">
                    <div className="b-green"><h4 className="ml-2">ABOUT</h4></div>
                    <p>This  project is developed by deepak ,saurav ,aman and ritesh under the guidance of Dr. Sukanta Kishore Bisoi (HOD Department of CSE, CVRGU)</p>
                </div>
                
                <div className="col-md-3 mb-3">
                    <div className="b-red"><h4 className="ml-2">CONTACT</h4></div>
                    <p className="mb-0">lms.support@example.com</p>
                    <p>+91 9668855719</p>
                </div>
                
                <div className="col-md-3 mb-3">
                    <div className="b-blue"><h4 className="ml-2">FOLLOW US</h4></div>
                    <ul className="list-unstyled list-inline mt-3">
                        <li className="list-inline-item mr-2"><a className="icon facebook"><FontAwesomeIcon icon={faFacebook} /></a></li>
                        <li className="list-inline-item mr-2"><a className="icon instagram"><FontAwesomeIcon icon={faInstagram} /></a></li>
                        <li className="list-inline-item mr-2"><a className="icon twitter"><FontAwesomeIcon icon={faTwitter} /></a></li>
                        <li className="list-inline-item"><a className="icon linkedin"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                    </ul>
                </div>
                
                <div className="col-md-3 mb-3">
                    <div className="b-yellow"><h4 className="ml-2">ANY QUERIES</h4></div>
                    <input type="text" className="form-control mt-2" placeholder="Name" required />
                    <input type="email" className="form-control mt-1 mb-2" placeholder="Email" required />
                    <button className="btn btn-block btn-warning">Submit</button>
                </div>
            </div>
            <div className="container-fluid  text-center py-3" style={{backgroundColor:"#141411"}}>© 2021 Copyright:<a href="#" className="ml-2">LMS Platform</a></div>

           
        </footer>
    )
}

export default Footer


 // <div className="row">
            //   <div className="col-md-3"><p style={{color:"red"}}>1st</p></div>
            //   <div className="col-md-3"><p style={{color:"red"}}>1st</p></div>
            //   <div className="col-md-3">3rd</div>
            //   <div className="col-md-3">4th</div>
            // </div>