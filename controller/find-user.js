var express = require('express');
var router = express.Router();

const User = require('../models/user');

/* GET users listing. */
router.get('/find/:email', async (req, res, next) => {

  const email = req.params.email;

  const data = await User.findOne({ email: email }).exec();
 
 
  res.json( data ); // retorna null si no lo encuentra

 



});

module.exports = router;
