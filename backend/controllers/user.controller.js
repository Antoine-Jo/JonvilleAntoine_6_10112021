const bcrypt = require('bcrypt'); // import du package Bcrypt pour le mdp
const jwt = require('jsonwebtoken'); // import du cryptage du token d'authentification
const User = require('../models/User.models'); // import de l'UserSchema

/** 
 * création d'un compte
 * @param   {Object}   req                la requête
 * @param   {Object}   req.body           le corps de la requete
 * @param   {String}   req.body.password  User's password.
 * @param   {String}   req.body.email     l'email de l'utilisateur.
 * @param   {Object}   res                la réponse
 * @param   {Function} [next]             l'étape suivante
 * @return  {void}                        envoie une réponse
 */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 15) // 15 étant le nombre de fois que le mdp va être hashé, plus ce chiffre est élévé plus c'est sécure mais long à réaliser
        .then(hash => {
            const user = new User({  // récupère le cryptage et va créé un nouvel utilisateur
                email: req.body.email,
                password: hash
            });
            user.save() // Fonction qui va enregistrer l'utilisateur dans la BDD
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        
        .catch(error => res.status(500).json({ error }));
};

/**
 * @typedef {import("../models/User.models").FicheUser} FicheUser
 */

/**
 * [login description]
 *
 * 
 * @param   {Object}    req.body            le corps de la requête
 * @param   {FicheUser} req                 la fiche de l'utilisateur
 * @param   {Object}    res                 la réponse
 * @param   {Function}  [next]              l'étape suivante
 *
 * @return  {Object}                        retourne un userId encodées dans le token
 */
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // On récupère l'user de la BDD qui correspond à l'adresse mail entrée
        .then(user => {
            if (!user) { // si l'email est pas bon on renvoit une erreur
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password) // On compare le mot de passe entrée avec le hash de la BDD
                .then(valid => {
                    if (!valid) { // Si la comparaison est mauvaise, on renvoit une erreur
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({ // Si la comparaison est OK, on renvoit au frontend son userId et son token d'authentification
                        userId: user._id,
                        token: jwt.sign( // sign de jsonwebtoken permet d'encoder un nouveau token
                           { userId: user._id }, // userId données encodées dans le token
                           process.env.SECRET, // chaine de caractère aléatoire bcp plus longue pour la production
                           { expiresIn: '24h' } // durée de validité du token (il devra donc se reconnecter quand il arrive à expiration)
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
}