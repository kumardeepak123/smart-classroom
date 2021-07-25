const mongoose = require("mongoose")


const lectureLinkSchema = new mongoose.Schema({
    LectureLinkStartTime:{type:String , required:true},
    LectureLinkEndTime:{type:String ,  required: true} ,
    LectureLinkStatus:{
        type:String,
        required:true,
        default:"closed"
        
    },
    LectureLinkOfClass:{type:String, required:true}
})

module.exports = mongoose.model("LectureLink" , lectureLinkSchema)