var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const User = require('../models/user');

/* GET users listing. */
router.post('/save', async (req, res, next) => {
    try {
        const data = new User({
            _id: uuidv4(),
            email: req.body.email,
            password: req.body.password
        });
        await data.save();
       
        res.json({ message: "Exito" });
    } catch (error) {
        res.json({ message: "Error" });
    }





});

module.exports = router;