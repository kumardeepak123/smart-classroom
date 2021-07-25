
const mongoose = require('mongoose') 
const {ObjectId} = mongoose.Schema.Types


const  studentSchema = new  mongoose.Schema({

    Sname :{
        type:String ,
        required :true
    },

    Semail:{
        type:String ,
        required: true
    },
    
    Spassword:{
        type:String ,
        required: true 
    },
    SClasses:[{type:ObjectId , ref:"Classroom"}],
    Sattendances:[{
        classroom:{
            type:ObjectId,
            ref:"Classroom"
        },
        cattendance:Number
    }],
    SquizScores:[{
        classroom:{
            type:ObjectId,
            ref:"Classroom"
        },
        classquizScores:[{
            quiz:{type:ObjectId , ref:"Quiz"},
            qScore:Number

        }]
    }],
    SassignmentResults:[{
        classroom:{
            type:ObjectId,
            ref:"Classroom"
        },
        classAssignmentScores:[{
            assignment:{type:ObjectId , ref:"Assignment"},
            aScore:Number

        }]
    }]
       
 
        
   

})

 module.exports = mongoose.model("Student" ,  studentSchema) ;