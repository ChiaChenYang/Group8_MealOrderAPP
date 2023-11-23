var express = require('express');
var UserCredentialController = require('../controllers/UserCredential');

var router = express.Router();

router.post('/signup', UserCredentialController.addUser);

router.get('/showall', UserCredentialController.showAllUsers);

module.exports = router;
