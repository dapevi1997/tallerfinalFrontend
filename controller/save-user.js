/**
 * Importación del módulo express.
 */
var express = require('express');
/**
 * Llamado de la función Router de express.
 */
var router = express.Router();
/**
 * Importación de la librería para crear un id único para los usuarios que se registren.
 */
const { v4: uuidv4 } = require('uuid');
/**
 * Imporatacion el modelo que guarda las credenciales de los jugadores.
 */
const User = require('../models/user');

/**
 * API POST para guardar las credenciales de un usuario en la base de datos MongoDB.
 */
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