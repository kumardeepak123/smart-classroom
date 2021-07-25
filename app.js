const express =require('express')
const mongoose = require('mongoose')
const app = express() ;
const bodyParser = require("body-parser")
require('dotenv').config() ;

const port = 5000 ;


//CONNECTING TO MONGODB 
mongoose.connect( process.env.MONGODB_ATLAS_URL ,{
    useNewUrlParser :true ,
    useUnifiedTopology : true
})
mongoose.connection.on('connected', ()=>{
    console.log("connected to mongo yeahh")
})
mongoose.connection.on('error', (err)=>{
    console.log("err connecting",err)
})


//MIDDLE WARES
app.use(bodyParser.json());


//REGISTERING ROUTES
 app.use(require('./routes/auth'));
 app.use(require('./routes/user'));
 app.use(require('./routes/teacher'));
 




app.listen(port , ()=>{
    console.log("server started on port", port ) ;
})