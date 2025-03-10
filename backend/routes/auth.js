const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
require('dotenv').config()

//createing secret for jwt authentication
const JWT_SECRET = process.env.JWT;

// Route 1 : Create a User using: POST "/api/auth/signup". No login required
router.post('/signup', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('type', 'Enter a valid type').isLength({ min: 3 }),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success,errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success = false;
      return res.status(400).json({success, error: "Sorry a user with this email already exists" })
    }
    //creating a secure password using bcryptjs adding salt and hash
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
      type: req.body.type,
    })

    //creating a jwt token fot authentication
    const data = {
      user :{
        id : user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);

    // res.json(user)
    success = true;
    res.json({success,authtoken,type: req.body.type})
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error occured");
  }
})


// Route 2 : Authenticating a User using: POST "/api/auth/signin". No login required
router.post('/signin', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password} = req.body;
  try {

    // Check whether the user with this email exist or not
    let user = await User.findOne({ email});
    if (!user) {
      success = false;
      return res.status(400).json({success, error: "Please try to login with correct crendentials" });
    }
    //verifying the password using bcrypt
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({success, error: "Please try to login with correct crendentials" });
      success = false;
    }

    const data = {
      user :{
        id : user.id
      }
    }
    const authtoken = await jwt.sign(data,JWT_SECRET);
    success = true;
    res.json({success, authtoken,type:user.type})
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error occured");
  }
})

// Route 3 : get loggedin user details using : POST "api/auth/getuser". Login required
router.post('/getuser', fetchuser , async (req,res)=>{
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error occured");
  }
})

// Route to get user data: GET "/api/auth/user". Login required
router.get('/user', fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route 4: Changing Password for a User using: POST "/api/auth/changepassword"
router.post('/changepassword', [
  body('email', 'Enter a valid email').isEmail(),
  body('newPassword', 'New password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  const { email, newPassword } = req.body;
  
  try {
    // Check whether the user with this email exists
    let user = await User.findOne({ email });

    if (!user) {
      success = false;
      return res.status(400).json({ success, error: "User not found" });
    }

    // Update the password with the new one
    const salt = await bcrypt.genSalt(10);
    const newSecPass = await bcrypt.hash(newPassword, salt);
    user.password = newSecPass;
    await user.save();

    success = true;
    res.json({ success, message: "Password changed successfully" });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error occurred");
  }
})


module.exports = router