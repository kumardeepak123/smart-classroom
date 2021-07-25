const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

//POST SCHEMA
// const postSchema = new mongoose.Schema({
//     Ppdf:{
//         data:Buffer,
//         contentType:String
//     },
//     PName:{
//         type:String,
//         required:true
//     }

// })

// const Post = mongoose.model("Post", postSchema)
//LIVELECTURE LINKS SCHEMA
// const lectureLinkSchema= new mongoose.Schema({
//     LectureLinkStartTime:{type:String , required:true},
//     LectureLinkEndTime:{type:String ,  required: true} ,
//     LectureLinkStatus:{
//         type:String,
//         required:true,
//         default:"closed"
        
//     },
//     LectureLinkOfClass:{type:String, required:true}
// })

// const LectureLink = mongoose.model("LectureLink" , lectureLinkSchema)
//CLASSROOM SCHEMA
const classroomSchema = new mongoose.Schema({
    CName:{
        type:String,
        required:true
    },
    // CTeacher:{
    //     type:ObjectId,
    //     ref:"Teacher"
    // },
    CTeacherName:{type:String, required:true},
    CTeacherEmail:{type:String ,required:true},
    // CTeacherPassword:{type:String ,required:true},
    CPosts:[{type:ObjectId , ref:"Post"}],
    Cstudents:[{type:ObjectId , ref:"Student"}],
    Cquizes:[{type:ObjectId , ref:"Quiz"}],
    ClectureLinks:[{type:ObjectId , ref:"LectureLink"}],
    Cassignments:[{type:ObjectId , ref:"Assignment"}]
    
})


// const Classroom = mongoose.model("Classroom", classroomSchema)

module.exports= mongoose.model("Classroom" , classroomSchema)