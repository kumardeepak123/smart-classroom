
const mongoose = require('mongoose') 
const {ObjectId} = mongoose.Schema.Types

const teacherSchema = new  mongoose.Schema({

    Tname :{
        type:String ,
        required :true
    },

    Temail:{
        type:String ,
        required: true
    },
    
    Tpassword:{
        type:String ,
        required: true 
    },
    Tclass:{
        type:ObjectId,
        ref:"Classroom"
    }

})

module.exports  = mongoose.model("Teacher" , teacherSchema) ;