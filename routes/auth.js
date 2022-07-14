const router = require('express').Router();
const authController = require('../controllers/auth-controller');

router.post('/create', authController.createUser);

router.post('/login', authController.logIn)

module.exports = router;