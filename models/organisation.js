const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const organisationSchema  = new mongoose.Schema({
    Oname:{type:String ,  required: true},
    Oclasses:[{type:ObjectId , ref:"Classroom"}],
    Oowner:{type:ObjectId, ref:"User"}

})


module.exports = mongoose.model("Organisation" , organisationSchema)