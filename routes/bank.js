const router = require('express').Router();
const isAdmin = require('../middlewares/isAdmin');
const fetchUser = require('../middlewares/fetchUser');
const bankController = require('../controllers/bank-controller');

router.get('/', fetchUser, isAdmin, bankController.getDetails)

module.exports = router;