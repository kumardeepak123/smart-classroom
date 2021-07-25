const mongoose = require("mongoose");
const User = require("../models/user");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Organisation = require("../models/organisation");
const  Classroom = require("../models/classroom");
const bcrypt = require("bcryptjs");



exports.createOrganisation =(req, res)=>{
    if(!req.body.name){
        return res.json({"message":"plss fill organisation name"})
    }
    const userId = req.user._id ;
    Organisation.findOne({Oname:req.body.name})
    .then(returnedo=>{
        if(returnedo)
        {
            return res.json({"message":"Organisation already  exsits"})
        }
       
        const organisation = new Organisation ({
            Oname: req.body.name ,
            Oowner:userId
        })
        
        organisation.save()
              .then(organisationObject=>{
    
                  User.findByIdAndUpdate( userId,{
                      $push:{Uorganisations: organisationObject._id}
                  }).then(user=> res.json({message:"Organisation created successfully"}))
                    .catch(err=> console.log(err))
    
              })
              .catch(err=>console.log(err))
        
    })
    .catch(err=> console.log(err))
    

}

exports.createAClassroom=(req,res)=>{
    const UserId = req.user._id
    // const teacherId = req.teacher._id
    const organisationId = req.params.organisationId

    const {className , tname , temail , tpassword}= req.body
    if(!className || !tname || !temail || !tpassword){
        return res.json({"message":"all fields required"})
    }

    Teacher.findOne({Temail:temail})
         .then(teacher=>{
             if(teacher){
                 return res.json({"message":"teacher mail id already exsits with different teacher account"})
             }

             Classroom.findOne({CName:className})
             .then(classRoom=>{
                 if(classRoom)
                 {   
                     Organisation.findById(organisationId)
                                 .populate("Oclasses" , "CName")
                                 .then(organisationO=>{
                                    const classArray =  organisationO.Oclasses
                                    console.log("CLASS ARRAY",classArray)
                                    var flag = false
                                    for(let i =0 ; i < classArray.length; i++){
                                        if(classArray[i].CName === className){
                                            flag =true 
                                            break
                                        }
                                    }
                                     
                                    if(flag){
                                        return res.json({"message": `classroom with ${className}  name already exsits in this organisation`})
                                    }

                                    const classroom = new Classroom({
                                        CName : className ,
                                        CTeacherName:tname,
                                        CTeacherEmail:temail
                                    })

                                    classroom.save()
                                              .then(classO=>{
                                                  Organisation.findByIdAndUpdate( organisationId,{
                                                      $push:{Oclasses:classO._id}
                                                  }).then(organ=>{
                                                       //SIGN UP FOR TEACHER
                                                       bcrypt.hash(tpassword, 12).then((hashedpassword) => {
                                                        //Tclass = req.classId   | req.classId  is only objectId not full class object
                                                        const tuser = new Teacher({
                                                          Temail: temail,
                                                          Tpassword: hashedpassword,
                                                          Tname: tname,
                                                          Tclass: classO._id
                                                        });
                                                
                                                        tuser
                                                          .save()
                                                          .then((user) => {
                                                          return res.status(200).json({"message":"classroom and teacher added successfully"})
                                                             
                                                          })
                                                          .catch((err) => {
                                                            console.log(err);
                                                          });
                                                      });
                                                  })
                                                  .catch(err=>console.log(err))
                                              })
                                              .catch(err=>console.log(err))

                                 })
                                 .catch(err=>console.log(err))
                     //return res.json({"message":"Classroom with this name already e"})
                 }
                 else{
                    const classroom = new Classroom({
                        CName : className ,
                        CTeacherName:tname,
                        CTeacherEmail:temail
                    })

                    classroom.save()
                              .then(classO=>{
                                  Organisation.findByIdAndUpdate( organisationId,{
                                      $push:{Oclasses:classO._id}
                                  }).then(organ=>{

                                       //SIGN UP FOR TEACHER
                                       bcrypt.hash(tpassword, 12).then((hashedpassword) => {                                       
                                        const tuser = new Teacher({
                                          Temail: temail,
                                          Tpassword: hashedpassword,
                                          Tname: tname,
                                          Tclass: classO._id
                                        });
                                
                                        tuser
                                          .save()
                                          .then((user) => {
                                          return res.status(200).json({"message":"classroom and teacher added successfully"})
                                             
                                          })
                                          .catch((err) => {
                                            console.log(err);
                                          });
                                      });
                                  })
                                  .catch(err=>console.log(err))
                              })
                              .catch(err=>console.log(err))
                 }
             })
             .catch(err=>console.log)

         })
         .catch(err=>console.log(err))
    
    
    

}

exports.getAOrganisation=(req ,res)=>{
    
    const organisationId =  req.params.organisationid 

    Organisation.findById(organisationId)
                .populate("Oclasses","CName CTeacherName Cstudents")
                .then(organisation=>{
                    if(organisation){
                        res.status(200).json({
                            Oclasses : organisation.Oclasses
                        })
                    }
                })
                .catch(err=>console.log(err))
         
}

exports.getAllOrganisationOfUser=(req,res)=>{
    const userid =  req.user._id
    User.findById(userid)
        .populate("Uorganisations","Oname")
        .then(user=>{
            if(user){
                return res.status(200).json({
                    UserOrganisations:user.Uorganisations
                })
            }
        })
        .catch(err=>console.log(err))
}