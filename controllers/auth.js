const mongoose = require("mongoose");
const User = require("../models/user");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//USER AUTHENTICATIONS
exports.usignup = (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(422).json({
      error: "please fill all the fields",
    });
  }

  User.findOne({ Uemail: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.json({
          message: "email already exists",
        });
      }

      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          Uemail: email,
          Upassword: hashedpassword,
          Uname: name,
        });

        user
          .save()
          .then((user) => {
            res.json({
              message: "user saved successfully",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.usignin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      message: "please add email or password",
    });
  }

  User.findOne({ Uemail: email })
    .then((saveduser) => {
      if (!saveduser) {
        return res.json({
          message: "invalid email or password",
        });
      }
      bcrypt
        .compare(password, saveduser.Upassword)
        .then((domatch) => {
          if (domatch) {
            // res.json({message: "signed in successfully"})
            const token = jwt.sign(
              { _id: saveduser._id },
              process.env.JWTSECRETE
            );
            const { _id, Uname, Uemail } = saveduser;
            res.json({ token, user: { _id, Uname, Uemail } });
          } else {
            res.json({ message: "invalid email or password" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.usignout = (req, res) => {
  res.status(200).json({
    message: "User logouted out successfully",
  });
};



//STUDENT AUTHENTICATION || TODO: EXPECT CLASSID DURING SIGNUP OF STUDENT THAT WILL BE PUSHED TO Sclassrooms array of  student object
exports.ssignup = async(req, res ) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(422).json({
      error: "please fill all the fields",
    });
  }
   
  Student.findOne({ Semail: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.json({
          message: "email already exists",
        });
      }

      bcrypt.hash(password, 12).then((hashedpassword) => {
        const suser = new Student({
          Semail: email,
          Spassword: hashedpassword,
          Sname: name,
        });

        suser
          .save()
          .then((user) => {
            res.json({
              message: "Student saved successfully",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.ssignin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      message: "please add email or password",
    });
  }

  Student.findOne({ Semail: email })
    .then((saveduser) => {
      if (!saveduser) {
        return res.json({
          message: "invalid email or password",
        });
      }
      bcrypt
        .compare(password, saveduser.Spassword)
        .then((domatch) => {
          if (domatch) {
            // res.json({message: "signed in successfully"})
            const token = jwt.sign(
              { _id: saveduser._id },
              process.env.JWTSECRETE
            );
            const { _id, Sname, Semail } = saveduser;
            res.json({ token, user: { _id, Sname, Semail } });
          } else {
            res.json({ message: "invalid email or password" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.ssignout = (req, res) => {
  res.status(200).json({
    message: "Student loggedout successfully",
  });
};



//TEACHER AUTHENTICATION  

//  exports.tsignup = (req, res ,next) => {
//   const { className , tname, temail, tpassword } = req.body;

//   if (!className || !temail || !tpassword || !tname) {
//     return res.status(422).json({
//        "message": "please fill all the fields",
//     });
//   }

//   Teacher.findOne({ Temail: temail })
//     .then((savedUser) => {
//       if (savedUser) {
//         return res.json({
//           message: "temail already exists",
//         });
//       }

//       bcrypt.hash(tpassword, 12).then((hashedpassword) => {
//         //Tclass = req.classId   | req.classId  is only objectId not full class object
//         const tuser = new Teacher({
//           Temail: temail,
//           Tpassword: hashedpassword,
//           Tname: tname,
//         });

//         tuser
//           .save()
//           .then((user) => {
//              req.teacher = user
//              next()
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//  };

exports.tsignin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      message: "please add email or password",
    });
  }

  Teacher.findOne({ Temail: email })
    .then((saveduser) => {
      if (!saveduser) {
        return res.json({
          message: "invalid email or password",
        });
      }
      bcrypt
        .compare(password, saveduser.Tpassword)
        .then((domatch) => {
          if (domatch) {
            // res.json({message: "signed in successfully"})
            const token = jwt.sign(
              { _id: saveduser._id },
              process.env.JWTSECRETE
            );
            const { _id, Tname, Temail ,Tclass} = saveduser;
            res.json({ token, user: { _id, Tname, Temail ,Tclass} });
          } else {
            res.json({ message: "invalid email or password" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.tsignout = (req, res) => {
  res.status(200).json({
    message: "Teacher logged out successfully",
  });
};




//MIDDLE WARES
exports.userIsSignedIn = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(422).json({
      error: " user  must be logged in",
    });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWTSECRETE, (err, payload) => {
    if (err) {
      return res.json("user must be logged in");
    }
    const { _id } = payload; // 3:20

    User.findById(_id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.studentIsSignedIn = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(422).json({
      error: "student  must be logged in",
    });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWTSECRETE, (err, payload) => {
    if (err) {
      return res.json("student must be logged in");
    }
    const { _id } = payload; // 3:20

    Student.findById(_id)
      .then((suser) => {
        req.student = suser;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.teacherIsSignedIn = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(422).json({
      error: "teacher  must be logged in",
    });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWTSECRETE, (err, payload) => {
    if (err) {
      return res.json("teacher must be logged in");
    }
    const { _id } = payload; // 3:20

    Teacher.findById(_id)
      .then((tuser) => {
        req.teacher = tuser;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
