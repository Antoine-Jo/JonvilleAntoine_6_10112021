const passwordValidator = require('password-validator');
const { getMaxListeners } = require('./User.models');

const passwordSchema = new passwordValidator()

passwordSchema
.is().min(8)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits(2)
.has().not().spaces() 


module.exports = passwordSchema;