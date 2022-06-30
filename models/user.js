const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateEmail = (email) =>{
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return regex.test(email);
};

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