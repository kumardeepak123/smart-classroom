const Teacher = require("../models/teacher")
const Student = require("../models/student")
const Classroom =  require("../models/classroom")
const Post = require("../models/post")
const LectureLink = require("../models/livelecture")
const Quiz =  require("../models/quiz")
const Question =  require("../models/question")
const bcrypt = require("bcryptjs");
const formidable = require('formidable');
const   fs =  require("fs")
const date = require('date-and-time');




//TEACHER ACTIVITIES
exports.getATeacherClass=(req,res)=>{
    const teacherId = req.teacher._id

    Teacher.findById(teacherId)
           .populate("Tclass")
           .then(teacher=>{
               if(teacher){
                   return res.json(teacher.Tclass)
               }
           })
           .catch(err=>console.log(err))
}

exports.addStudents= async (req, res)=>{
    
//   for(const item of arr){
//       await delayedLog(item)
      
//   }
//   console.log("completed")
//   res.send("completed")
  const classid = req.params.claaroomId
  const students = req.body
  const failtoaddStudents=[]
  const  alreadyExistedStudents=[]

  for (const student of students){
     let {name ,email ,password} = student
      if(!name ||!email ||!password){
          failtoaddStudents.push(student)
          continue;
      }
      try{
      const returnedStudent =  await Student.findOne({Semail:email})
    //   const sclasses= returnedStudent.SClasses
    //    let flag = false
    //    for(let cl=0; cl< sclasses.length(); cl++){
    //        if(cl=== classid ){
    //             flag =true ;
    //             break;
    //        }
    //    }
      if(returnedStudent){
        const sclasses= returnedStudent.SClasses
         let  flag = false
        for(const cl of sclasses){
            //console.log(cl , typeof(cl) , typeof(classid))
            // cl type is object
            // classid is string
            if(cl== classid ){
                 flag = true ;
                 break;
            }
        }
        if(flag){
            alreadyExistedStudents.push({"Sname":returnedStudent.Sname ,"Semail": returnedStudent.Semail })
        }
        else{
             try{
               const  ustudent =  await Student.findByIdAndUpdate(returnedStudent._id ,{$push:{SClasses:classid ,Sattendances:{classroom:classid ,cattendance:0}}})
               try{
                const classOf_Student  = await Classroom.findByIdAndUpdate(classid , {$push:{Cstudents:ustudent._id}})
                   console.log(ustudent.Sname +" added to classroom"+classOf_Student.CName);
                }catch(err)
                {
                    console.log(err) ;
                }
            
             }catch(err)
             {
                 console.log(err)
             }
        }
      }
      else{
       
        try{
            const hashedpassword = await bcrypt.hash(password, 12)
            const suser =  new Student({
                Sname:name,
                Semail:email,
                Spassword: hashedpassword,

            })
            try{
                const  rsuser= await suser.save() 
                try{
                const studentObject  =  await Student.findByIdAndUpdate( rsuser._id,{$push:{SClasses:classid , Sattendances:{classroom:classid ,cattendance:0}}}) 
                console.log(studentObject.Sname+"added successfully")
                 
                try{
                 const classOfStudent  = await Classroom.findByIdAndUpdate(classid , {$push:{Cstudents:studentObject._id}})
                    console.log(studentObject.Sname +" added to classroom"+classOfStudent.Cname);
                 }catch(err)
                 {

                 }
                }catch(err)
                {
                    console.log(err)
                }
                
               }catch(err){
                   console.log(err)
               }
               
   

          }catch(err)
          {
              console.log(err)
          }
      }

      }catch(err){
          console.log(err)
      }
//...........
    //  if(returnedStudent){
    //      alreadyExistedStudents.push(returnedStudent)
    //  }
    //  else{
    //       try{
    //         const hashedpassword = await bcrypt.hash(password, 12)
    //       }catch(err)
    //       {
    //           console.log(err)
    //       }
    //      const suser =  new Student({
    //          Sname:name,
    //          Semail:email,
    //          Spassword: hashedpassword
    //      })

    //    try{
    //     const  rsuser= await suser.save()
    //    }catch(err){
    //        console.log(err)
    //    }
    //    console.log(rsuser.Sname+"added successfully")
    //  }
  }

  return res.json({
      "message":"completed",
    "Students_with_missingFields_during_signup": failtoaddStudents,
    "Already_exsited_students_inthis_classroom":alreadyExistedStudents
  })

}
exports.createPost=(req,res)=>{
    const classroomId =  req.params.classroomId 
    const form = formidable({ multiples: true });
 
   form.parse(req, (err, fields, files) => {
    if (err) {
     
      return  res.json({"error":err})
    }
    // res.json({ fields, files });
    if(! fields.postName || ! files.postpdf){
        return res.json({"message":"please include all the fields"})
    }
    const post = new Post({
        PName : fields.postName 
    })
     if(files.postpdf){
        post.Ppdf.data = fs.readFileSync(files.postpdf.path)       
        post.Ppdf.contentType= files.postpdf.type
     }
     post.save()
         .then(post=> {
            Classroom.findByIdAndUpdate(classroomId , {$push:{
                CPosts:post._id
            }})
            .then(classRoom=> res.json({"message":`${post.PName} created succsessfully`}))
            .catch(err=>console.log(err))}
            ) 
            //  res.json(post)})
         .catch(err=>console.log(err))
     
  });
}

exports.createLiveLecture=(req,res)=>{
    const classroomid =  req.params.classroomId 
    const {lectureLink , LstartTime , LendTime} =  req.body ;

//VALIDATION
const targetDate = LstartTime    
const arr = targetDate.split(" ")
const endTimeArr = LendTime.split(" ")
const fp = arr[0]
const endTimeS = endTimeArr[0]
const sp = arr[1].split(":") // ["11","30","20"]
const endT = endTimeArr[1].split(":") // ["12", "30","20"]
if(fp != endTimeS){
    return  res.json({"message":"date and month of both the times did't match"})
} 
const sthour = sp[0].charAt(0)=="0"? parseInt(sp[0].charAt(1)) : parseInt(sp[0]) ;
const stmin  = sp[1].charAt(0)=="0"? parseInt(sp[1].charAt(1)) : parseInt(sp[1]) ;
const stsec   = sp[2].charAt(0)=="0"? parseInt(sp[2].charAt(1)) : parseInt(sp[2]) ;
const ethour = endT[0].charAt(0)=="0"? parseInt(endT[0].charAt(1)) : parseInt(endT[0]) ;
const etmin  = endT[1].charAt(0)=="0"? parseInt(endT[1].charAt(1)) : parseInt(endT[1]) ;
const etsec = endT[2].charAt(0)=="0"? parseInt(endT[2].charAt(1)) : parseInt(endT[2]) ;
const now = new Date();
const cDate =date.format(now, 'YYYY/MM/DD HH:mm:ss');
console.log("current time ....",cDate )
const currArrr = cDate.split(" ")[1].split(":") //  ["12", "30","20"]
const ccthour = currArrr[0].charAt(0)=="0"? parseInt(currArrr[0].charAt(1)) : parseInt(currArrr[0]) ;
const cctmin  = currArrr[1].charAt(0)=="0"? parseInt(currArrr[1].charAt(1)) : parseInt(currArrr[1]) ;
const cctsec  = currArrr[2].charAt(0)=="0"? parseInt(currArrr[2].charAt(1)) : parseInt(currArrr[2]) ;
const checkS = [sthour, stmin ,stsec]
const checkE = [ethour ,etmin , etsec]
const currTimearr = [ccthour ,cctmin ,cctsec]
for (let i =0 ;i<3;i++)
{   //console.log("hiiii.....")
if(checkS[i]> currTimearr[i])
{
    break ;
}

if(checkS[i]< currTimearr[i]){
    console.log("start time should be grater than current time")
    return res.json({"message":`start time should be grater than current time = ${cDate}`})
}
}
let checker = false     
for( i =0 ;i<checkE.length;i++){
if(checkE[i]>checkS[i]){
    checker =true
    break;
}
if(checkE[i]<checkS[i])
{
    break;
}
}
if(!checker){
    return res.json({"message":"end time must be greater than start time"})
}

const classDuration = ((ethour-sthour)*3600 + (etmin-stmin)*60 + (etsec-stsec))*1000 // class duration is in mili seconds
console.log(classDuration)
if(classDuration <900000)
{
return res.json({"message":"class duration should be minimum of 15 mins"})
}


//CREATE LECTURE LINK OBJECT
const lecturelinkClass =  new LectureLink({
LectureLinkStartTime: LstartTime,
LectureLinkEndTime:LendTime,
LectureLinkOfClass: lectureLink
})

//SAVING UPCOMING LECTURELINK OBJECT IN DB
lecturelinkClass
.save()
.then(returnLinkObj=>{
//TODO ADD TO CLASS
Classroom.findByIdAndUpdate(classroomid , {
    $push:{ClectureLinks:returnLinkObj._id}
}).then(classObj=>{
     
    const now = new Date();
    const currentDate =date.format(now, 'YYYY/MM/DD HH:mm:ss');
    console.log("class created successfully....",currentDate )
    res.json({"message":"live class added successfulyy"})
    const currArr = currentDate.split(" ")[1].split(":") //  ["12", "30","20"]
    const cthour = currArr[0].charAt(0)=="0"? parseInt(currArr[0].charAt(1)) : parseInt(currArr[0]) ;
    const ctmin  = currArr[1].charAt(0)=="0"? parseInt(currArr[1].charAt(1)) : parseInt(currArr[1]) ;
    const ctsec  = currArr[2].charAt(0)=="0"? parseInt(currArr[2].charAt(1)) : parseInt(currArr[2]) ;
    const classDurationBeforeStart = ((sthour-cthour)*3600+ (stmin-ctmin)*60+(stsec-ctsec))*1000// in seconds
    console.log(classDurationBeforeStart)
    setTimeout(()=>{
        LectureLink
        .findByIdAndUpdate(returnLinkObj._id,{LectureLinkStatus:"active"})
        .then(Rlink=>{
            const now = new Date();
            const cst =date.format(now, 'YYYY/MM/DD HH:mm:ss');
            console.log("class started...",cst)
            setTimeout(()=>{
                LectureLink
                .findByIdAndUpdate(Rlink._id, {LectureLinkStatus:"closed"})
                .then(Llink=>{
                    const now = new Date();
                    const cet =date.format(now, 'YYYY/MM/DD HH:mm:ss');
                    console.log("class ended" ,cet)
                //     return  res.json({"message":"class time is over"})
                 })
                .catch(err=>console.log(err))
            },classDuration)
        })
        .catch(err=>console.log(err)) 
    },classDurationBeforeStart)

})
    .catch(err=>console.log(err))
})
.catch(err=>console.log(err))

                      
}


// add all the questions of the quiz to db on a single click
exports.addQuiz= async(req,res)=>{
    const classroomid =  req.params.classroomId 
    const {quizName ,  qstartTime , qendTime, questions } =  req.body ;
    let  LstartTime = qstartTime
    let LendTime =   qendTime

//VALIDATION
const targetDate = LstartTime    
const arr = targetDate.split(" ")
const endTimeArr = LendTime.split(" ")
const fp = arr[0]
const endTimeS = endTimeArr[0]
const sp = arr[1].split(":") // ["11","30","20"]
const endT = endTimeArr[1].split(":") // ["12", "30","20"]
if(fp != endTimeS){
    return  res.json({"message":"date and month of both the times did't match"})
} 
const sthour = sp[0].charAt(0)=="0"? parseInt(sp[0].charAt(1)) : parseInt(sp[0]) ;
const stmin  = sp[1].charAt(0)=="0"? parseInt(sp[1].charAt(1)) : parseInt(sp[1]) ;
const stsec   = sp[2].charAt(0)=="0"? parseInt(sp[2].charAt(1)) : parseInt(sp[2]) ;
const ethour = endT[0].charAt(0)=="0"? parseInt(endT[0].charAt(1)) : parseInt(endT[0]) ;
const etmin  = endT[1].charAt(0)=="0"? parseInt(endT[1].charAt(1)) : parseInt(endT[1]) ;
const etsec = endT[2].charAt(0)=="0"? parseInt(endT[2].charAt(1)) : parseInt(endT[2]) ;
const now = new Date();
const cDate =date.format(now, 'YYYY/MM/DD HH:mm:ss');
console.log("current time ....",cDate )
const currArrr = cDate.split(" ")[1].split(":") //  ["12", "30","20"]
const ccthour = currArrr[0].charAt(0)=="0"? parseInt(currArrr[0].charAt(1)) : parseInt(currArrr[0]) ;
const cctmin  = currArrr[1].charAt(0)=="0"? parseInt(currArrr[1].charAt(1)) : parseInt(currArrr[1]) ;
const cctsec  = currArrr[2].charAt(0)=="0"? parseInt(currArrr[2].charAt(1)) : parseInt(currArrr[2]) ;
const checkS = [sthour, stmin ,stsec]
const checkE = [ethour ,etmin , etsec]
const currTimearr = [ccthour ,cctmin ,cctsec]
for (let i =0 ;i<3;i++)
{   //console.log("hiiii.....")
if(checkS[i]> currTimearr[i])
{
    break ;
}

if(checkS[i]< currTimearr[i]){
    console.log("start time should be grater than current time")
    return res.json({"message":`start time should be grater than current time = ${cDate}`})
}
}
let checker = false     
for( i =0 ;i<checkE.length;i++){
if(checkE[i]>checkS[i]){
    checker =true
    break;
}
if(checkE[i]<checkS[i])
{
    break;
}
}
if(!checker){
    return res.json({"message":"end time must be greater than start time"})
}

const quizDuration = ((ethour-sthour)*3600 + (etmin-stmin)*60 + (etsec-stsec))*1000 // class duration is in mili seconds
console.log(quizDuration)
// if(quizDuration <900000)
// {
// return res.json({"message":"class duration should be minimum of 15 mins"})
// }



//CREATE QUIZ OBJECT
 const  questionsArr = []
for (let que  of questions)
{
    const {queName ,Option1,Option2,Option3,Option4  , correctAnswer, userAnswer} = que ;
     
        const questionO = new Question({
            QuestionName: queName ,
            Option1: Option1,
            Option2: Option2,
            Option3: Option3,
            Option4: Option4,
            QuestionCorrectAnswer: correctAnswer ,
            QuestionGivenAnswer : userAnswer 
        })

  
    try{
        const  rquestion = await  questionO.save()
         questionsArr.push(rquestion._id)
    }catch(err)
    {
        console.log(err);
    }
}

// NEWLY  CREATED QUIZ
 const  newQuiz = new Quiz({
    QuizName : quizName,
    QuizStartTime : qstartTime ,
    QuizEndTime : qendTime ,
    QuizQuestions : questionsArr,
    QuizStatus: "closed"
 })
 

// saving the quiz in the classroom 
newQuiz
.save()
.then(rQuiz=>{
//TODO ADD TO CLASS
Classroom.findByIdAndUpdate(classroomid , {
    $push:{Cquizes:rQuiz._id}
}).then(classObj=>{
     
    const now = new Date();
    const currentDate =date.format(now, 'YYYY/MM/DD HH:mm:ss');
    console.log(" new quiz added in classroom   successfully....",currentDate )
    res.json({"message":"quiz added in the Classroom successfully"})
    const currArr = currentDate.split(" ")[1].split(":") //  ["12", "30","20"]
    const cthour = currArr[0].charAt(0)=="0"? parseInt(currArr[0].charAt(1)) : parseInt(currArr[0]) ;
    const ctmin  = currArr[1].charAt(0)=="0"? parseInt(currArr[1].charAt(1)) : parseInt(currArr[1]) ;
    const ctsec  = currArr[2].charAt(0)=="0"? parseInt(currArr[2].charAt(1)) : parseInt(currArr[2]) ;
    const classDurationBeforeStart = ((sthour-cthour)*3600+ (stmin-ctmin)*60+(stsec-ctsec))*1000// in seconds
    console.log(classDurationBeforeStart)
    setTimeout(()=>{
        Quiz
        .findByIdAndUpdate(rQuiz._id,{QuizStatus:"active"})
        .then(RQuiz=>{
            const now = new Date();
            const cst =date.format(now, 'YYYY/MM/DD HH:mm:ss');
            console.log("quiz  started...",cst)
            setTimeout(()=>{
                Quiz
                .findByIdAndUpdate(RQuiz._id, {QuizStatus:"closed"})
                .then( qquiz=>{
                    const now = new Date();
                    const cet =date.format(now, 'YYYY/MM/DD HH:mm:ss');
                    console.log("quiz ended" ,cet)
                //     return  res.json({"message":"class time is over"})
                 })
                .catch(err=>console.log(err))
            },quizDuration)
        })
        .catch(err=>console.log(err)) 
    },classDurationBeforeStart)

})
    .catch(err=>console.log(err))
})
.catch(err=>console.log(err))

                      
}





