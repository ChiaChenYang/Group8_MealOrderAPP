var express = require('express');
var UserCredentialController = require('../controllers/UserCredential')

var router = express.Router();

router.post('/consumer/signup', UserCredentialController.addConsumerUser);
router.post('/consumer/login', UserCredentialController.validateConsumerUser);
router.post('/merchant/signup', UserCredentialController.addMerchantUser);
router.post('/merchant/login', UserCredentialController.validateMerchantUser);

// router.post('/signup', UserCredentialController.addUser);
// router.get('/showall', UserCredentialController.showAllUsers);

module.exports = router;
