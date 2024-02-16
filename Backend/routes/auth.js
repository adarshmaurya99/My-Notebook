const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'bhaiyameranaamhritu'
//ROUTE 1: Creating a User using POST "/api/auth/createuser" No login required

router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter a valid password").isLength({ min: 4 })
], async (req, res) => {
    //If there are errors return bad requests and errors
    success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }

    //Check whether user with given mail already exist
    try {
        let user = await User.findOne({ email: req.body.email }).exec();
        if (user) {
            return res.status(400).json({ success, error: "Email already exist" })
        }
        //Creating new user
        const salt = await bcrypt.genSalt(10);
        secPassword = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        });
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        //console.log(authToken);
        success = true;
        res.json({success, authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occured');
    }
})

//ROUTE 2: Authenticate a User using POST "/api/auth/login" No login required
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password can not be blank").exists()
], async (req, res) => {
    success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ error: "Please login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        //console.log(authToken);
        success = true;
        res.json({ success, authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occured');
    }
})

//ROUTE 3: Get User detail using POST "/api/auth/getuser" Login required
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occured');
    }
})
module.exports = router