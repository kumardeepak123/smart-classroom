const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
    Ppdf:{
        data:Buffer,
        contentType:String
    },
    PName:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("Post" , postSchema)