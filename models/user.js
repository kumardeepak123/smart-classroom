
const mongoose = require('mongoose') 
const {ObjectId} = mongoose.Schema.Types


const userSchema = new  mongoose.Schema({

    Uname :{
        type:String ,
        required :true
    },

    Uemail:{
        type:String ,
        required: true
    },
    
    Upassword:{
        type:String ,
        required: true 
    },
    Uorganisations:[{type:ObjectId , ref:"Organisation"}]

})

module.exports=  mongoose.model("User" , userSchema) ;