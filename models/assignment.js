const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const uploadAssignmentSchema = new mongoose.model({
    uploadedAssignment:{
        data: Buffer,
        contentType:String
    },
    uploadAssignmentStudent:{
        type:ObjectId,
        ref:"Student"
    }
})

const uploadAssignment  = mongoose.model("UploadAssignment", uploadAssignmentSchema)

const assignMentSchema = new mongoose.Schema({
    AssignmentEndTime:{type:String , required:true},
    AssignmentStatus:{
        type:String,
        default:"closed"
    },
    AssignmentPhoto:{
        data:Buffer,
        contentType:String
    },
    AssignmentUploads:[uploadAssignmentSchema]
})


const assignment = mongoose.model("Assignment", assignMentSchema)

module.exports={assignment ,uploadAssignment}