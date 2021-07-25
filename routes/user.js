const express = require("express");
const router = express.Router();
const {userIsSignedIn }= require("../controllers/auth")
const {createOrganisation ,
       getAllOrganisationOfUser ,
       createAClassroom , 
       getAOrganisation
    } = require("../controllers/user")




//USER ACTIVITIES
router.post("/createOrganisation", userIsSignedIn , createOrganisation );
router.post("/createClassRoom/:organisationId", userIsSignedIn  , createAClassroom);
router.get("/organisation/:organisationid", userIsSignedIn , getAOrganisation);
router.get("/allOrganisations",userIsSignedIn , getAllOrganisationOfUser);





module.exports = router