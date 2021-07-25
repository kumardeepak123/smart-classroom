const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    QuestionName: {
        type:String,
        required:true
    },
    Option1:{type:String , required:true},
    Option2:{type:String , required:true},
    Option3:{type:String , required:true},
    Option4:{type:String , required:true},
    QuestionCorrectAnswer:{type:String, required:true}
    

})


module.exports =  mongoose.model("Question" , QuestionSchema)