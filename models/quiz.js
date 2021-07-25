const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

// const QuestionSchema = new mongoose.Schema({
//     QuestionName: {
//         type:String,
//         required:true
//     },
//     QuestionOption1:{type:String , required:true},
//     QuestionOption2:{type:String , required:true},
//     QuestionOption3:{type:String , required:true},
//     QuestionOption4:{type:String , required:true},
//     QuestionCorrectAnswer:{type:String, required:true}
// })

// const question = mongoose.model("Question", QuestionSchema)
const quizSchema = new mongoose.Schema({
    QuizName:{
        type:String,
        required: true
    },
    QuizStartTime:{
        type:String,
        required:true
    },
    QuizEndTime:{
        type:String,
        required:true
    },
    QuizStatus:{
        type:String,
        default:"closed"
    },
    QuizQuestions:[{type:ObjectId , ref:"Question"}]
})




module.exports= mongoose.model("Quiz" , quizSchema)