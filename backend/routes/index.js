var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("require home page.")
  res.render('index', { title: 'Express' });
});

module.exports = router;
