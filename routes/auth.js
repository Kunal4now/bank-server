const router = require('express').Router();
const authController = require('../controllers/auth-controller');
const {body, validationResult} = require('express-validator');

router.post('/create',[
    body('email').isEmail().withMessage('Email must be valid'),
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long')
] , authController.createUser);

router.post('/login', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long')
], authController.logIn)

module.exports = router;