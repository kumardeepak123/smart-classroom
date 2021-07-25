const date = require('date-and-time');


const test=()=>{
    //  const targetDate = '2020/10/05 19:45:20'  // date set for live meeting by the teacher coming from DB

    //  const arr = targetDate.split(" ")
    //  const fp = arr[0]
    //  const sp = arr[1].split(":")


     
     const now = new Date();
     const rd =date.format(now, 'YYYY/MM/DD HH:mm:ss');
     console.log(rd)   // current date
    //  const arrr = rd.split(" ")
    //  const fpc= arrr[0]
    //  const spc = arrr[1].split(":")   
     

    // for (let i =0 ;i<3;i++)
    // {
    //     if(spc[i]> sp[i])
    //     {
    //         break ;
    //     }

    //     if(spc[i]< sp[i]){
    //         console.log("meeting not started")
    //         return
    //     }
    // }
    

    //  console.log("meeting started")
    //  //update status to active\
    // //  const Timeduration = 60000
    //  setTimeout(()=>{
    //      console.log("meeting ended")
    //      //update status to closed
    //      const now = new Date();
    //      const endTime =date.format(now, 'YYYY/MM/DD HH:mm:ss');
    //      console.log("set end time in database"+endTime)
    //      return 
    //  }, Timeduration)
    //  console.log("hi")
     
  
}
test();

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
