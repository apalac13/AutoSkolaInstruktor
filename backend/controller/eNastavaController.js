const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const Otp = require('../models/otp');
// const sendMail = require('../mail/mail');

const saltRunde = 10;

exports.getCheck = (req, res, next) => {
  res.json({ msg: "All ok" });
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(403).send("Ne postoji autorizacijasko zaglavlje");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(403).send("Bearer token nije pronađen");

  try {
    const dekodiraniToken = jwt.verify(token, "tajniKljuc");
    req.user = dekodiraniToken;
  } catch (error) {
    res.status(401).send("Neispravni Token");
  }
  return next();
};

exports.register = async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User already exists with this email!" });
    }

    // Create a new user instance
    const hashPassword = await bcrypt.hash(req.body.password, saltRunde);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword, // Ensure hashPassword is an async function
      role: req.body.email === "jure@gmail.com" ? "admin" : "user",
    });
    // Save the new user to the database
    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred during registration!" });
  }
};
// exports.registerTeacher = async (req, res) => {
//   const user = new User({
//     contact: req.body.phone,
//     email: req.body.email,
//     role: "teacher",
//     password: User.hashPassword(req.body.p1),
//   });
//   User.find({ email: req.body.email }, (err, users) => {
//     if (err) {
//       console.log("err in finding email ");
//       res.json({ msg: "some error!" });
//     }
//     if (users.length !== 0) {
//       console.log("already user with this email");
//       res.json({ msg: "already user exist with this email!" });
//     } else {
//       user.save((error, registeredUser) => {
//         if (error) {
//           console.log(error);
//           res.json({ msg: "some error!" });
//         } else {
//           const payload = { subject: registeredUser._id };
//           const token = jwt.sign(payload, "secretkey");
//           res.status(200).json({ token: token });
//         }
//       });
//     }
//   });
// };

exports.logIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        "tajniKljuc",
        { expiresIn: "1h" }
      );
      res.json({ token });
    } else {
      res.status(401).send("Neispravni podaci za prijavu");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// function getEmail(email) {
//   Otp.find({ email: email }, (err, otps) => {
//     if (err) {
//       console.log("err in finding email ");
//     }
//     if (otps.length !== 0) {
//       console.log("yes in delete");
//       Otp.deleteOne({ email: email }, (err) => {
//         if (err) {
//           console.log("err in delete");
//         }
//       });
//     }
//   });
// }

// exports.Reset = (req, res) => {
//   User.find({ email: req.body.email }, async (err, users) => {
//     if (err) {
//       console.log("err in finding email ");
//       res.json({ msg: "some error!" });
//     }
//     if (users.length === 0) {
//       console.log("user does not exist with this email at forgot password");
//       res.json({ msg: "user does not exist with this email" });
//     } else {
//       const email = req.body.email;
//       const x = await getEmail(req.body.email);
//       setTimeout(async function () {
//         console.log("timeout (2min)");
//         const y = await getEmail(email);
//       }, 2 * 60000);
//       const a = Math.floor(1000 + Math.random() * 9000);
//       const otp = new Otp({
//         otp: a,
//         email: req.body.email,
//       });
//       console.log("otp =", otp);
//       try {
//         const doc = otp.save();
//         sendMail(otp.email, otp.otp);
//         res.status(201).json({ message: "all ok otp has been sent" });
//       } catch (err) {
//         res.json({ msg: "some error!" });
//       }
//     }
//   });
// };

// exports.resestPasswordDone = (req, res) => {
//   User.findOne({ email: req.body.email }, async (err, user) => {
//     if (err) {
//       console.log(err);
//       res.json({ msg: "Something went wrong" });
//     } else {
//       if (!user) {
//         res.json({ msg: "User does not exist with this email!!" });
//       } else {
//         Otp.findOne({ email: req.body.email }, async (err, otps) => {
//           if (err) {
//             res.json({ msg: "Something went wrong" });
//           }
//           if (!otps) {
//             res.json({ msg: "Something went wrong" });
//           } else {
//             const otp = otps.otp;
//             if (otp !== req.body.otp) {
//               res.json({ msg: "Invalid Otp!!!" });
//             } else {
//               const p = User.hashPassword(req.body.p1);
//               const x = await getEmail(req.body.email);
//               User.updateOne(
//                 { email: req.body.email },
//                 { password: p },
//                 function (err, user) {
//                   if (err) {
//                     console.log(err);
//                     res.json({ msg: "Something went wrong" });
//                   } else {
//                     res.json({ message: "password updated!!" });
//                   }
//                 }
//               );
//             }
//           }
//         });
//       }
//     }
//   });
// };

// exports.testDone = (req, res, next) => {
//   console.log("yo boy at backend");
//   console.log(req.body);
//   res.json({ msg: "hello utsav" });
// };