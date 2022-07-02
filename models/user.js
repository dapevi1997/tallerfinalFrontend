/**
 * Importación de la librería mongoose para gestionar la base de datos en MongoDB.
 */
const mongoose = require('mongoose');
/**
 * Permite hacer el uso de modelos.
 */
const Schema = mongoose.Schema;
/**
 * Función para validar los emails ingresados.
 * @param {String} email 
 * @returns email validado.
 */
const validateEmail = (email) =>{
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return regex.test(email);
};
/**
 * Creación del modelo para almcaenar credenciales de los usuarios al registrarse.
 */
const userSchema = new Schema({
    _id: {type: String, required: true},

    email: {
        type: String,
        trim: true,
        required: [true, 'El correo es requridooo'],
        unique: true,
        validate: {
            validator: validateEmail,
            message: 'Por favor digite correo válido'
        }
        
     }, 
    password:{
        type: String,
        trim: true,
        required: [true, 'La contraseña es requerida']
    }


});


module.exports = User = mongoose.model('User', userSchema);