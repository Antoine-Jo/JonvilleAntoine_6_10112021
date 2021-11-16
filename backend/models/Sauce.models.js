const mongoose = require('mongoose');


/**
 * [Schema description]
 *
 * @typedef     {Object}        FicheProduit        
 * @property    {String}        userId              userid
 * @property    {String}        name                nom de la sauce
 * @property    {String}        manufacturer        Fabricant de la sauce
 * @property    {String}        description         description de la sauce
 * @property    {String}        mainPepper          ingrédient de la sauce
 * @property    {String}        imageUrl            image de la sauce
 * @property    {Number}        heat                piquant de la sauce
 * @property    {Number}        likes               nombre de like pour la sauce
 * @property    {Number}        dislikes            nombre de dislike pour la sauce
 * @property    {[String]}      userLiked           tableau d'utilisateur qui like la sauce
 * @property    {[String]}      usersDisliked       tableau d'utilisateur qui dislike la sauce
 */
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true },
});

module.exports = mongoose.model('Sauce', sauceSchema);