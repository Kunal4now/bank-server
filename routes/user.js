const router = require('express').Router();
const fetchUser = require('../middlewares/fetchUser');
const isAdmin = require('../middlewares/isAdmin');
const userController = require('../controllers/user-controller');

router.get('/getall', fetchUser, isAdmin, userController.getAll)

router.get('/', fetchUser, userController.getUser)

module.exports = router;