const bcrypt = require('bcrypt'); // import du package Bcrypt pour le mdp

const User = require('../models/User.models'); // import de l'UserSchema

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
}

exports.login = (req, res, next) => {
    
}