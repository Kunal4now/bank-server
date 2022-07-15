const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Bank = require('../models/Bank');
const {validationResult} = require('express-validator');

exports.logIn = async (req, res) => {
    let errors = validationResult(req)
    errors = errors.errors.map((err) => {
        return err.msg
    })
    if (errors.length != 0) {
       return res.status(200).json({messg: errors, success: false})
    }
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email
        })

        if (!user) {
            return res.status(400).json({messg: ['User not found'], success: false})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({messg: ['Incorrect password'], success: false})
        }

        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            accountNo: user.accountNo,
            role: user.role
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        return res.status(200).json({ token, success: true, user: payload });
    } catch(err) {
        return res.status(500).json(err);
    }
}

exports.createUser = async (req, res) => {
    let errors = validationResult(req)
    errors = errors.errors.map((err) => {
        return err.msg
    })
    if (errors.length != 0) {
       return res.status(200).json({messg: errors, success: false})
    }
    try {
        const [name, email, password] = [req.body.name, req.body.email, req.body.password];

        const user = await User.findOne({
            email: email
        })

        if (user) {
            res.status(400).json('User already exists')
        }

        //generate unique account number
        const accountNo = Math.random().toFixed(16).split('.')[1];

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: secPass,
            accountNo: accountNo,
        })

        await Bank.updateOne({}, {
            $inc: {
                totalAccounts: 1    //increment totalAccounts by 1
            }
        })

        await newUser.save();

        res.status(200).json({newUser, success: true})
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}
