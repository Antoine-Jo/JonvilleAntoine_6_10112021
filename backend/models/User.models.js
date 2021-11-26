const mongoose = require('mongoose');
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator');



/**
 * [Schema description]
 *
 * @typedef     {Object}    FicheUser
 * @property    {String}    email       email de l'utilisateur
 * @property    {String}    password    mot de passe de l'utilisateur
 */
const userSchema = mongoose.Schema({
    email: { type: String, required: true, validate: [isEmail], unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);