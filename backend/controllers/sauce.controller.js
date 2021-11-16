const Sauce = require('../models/Sauce.models'); // import du Schema des sauces
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistré avec succès !' }))
        .catch(error => res.status(400).json({ error }));
};


exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {                                       // Si on modifie l'image, on récupère la chaine de caractère de la sauce et on la parse en objet, et on modifie l'imageUrl
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };                    // sinon on prend le corps de la requête et on le modifie
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié avec succès !' }))
        .catch(error => res.status(400).json({ error }))
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }))
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.likeDislikeSauce = (req, res, next) => {
    

    if (req.body.like === 1) {
        Sauce.updateOne(
        {_id: req.params.id },
            { $push: { usersLiked: req.body.userId },
              $inc: {likes: 1}
        }
        )
        .then(() => res.status(200).json({ message: 'Vous avez liké cette sauce.' }))
        .catch((error) => res.status(400).json({ error }));
    };

    if (req.body.like === -1) {
        Sauce.updateOne(
        {_id: req.params.id },
            { $push: { usersDisliked: req.body.userId },
              $inc: {dislikes: 1}
        }
        )
        .then(() => res.status(200).json({ message: 'Vous avez disliké cette sauce.' }))
        .catch((error) => res.status(400).json({ error }));
    };

    if (req.body.like === 0) {
        Sauce.findOne({
            _id: req.params.id
        })

        .then((sauce) => {

            if (sauce.usersDisliked.find(user => user === req.body.userId)) {
                Sauce.updateOne(
                    {_id: req.params.id },
                    { $pull: { usersDisliked: req.body.userId },
                    $inc: {dislikes: -1}
                }
                )
                .then(() => res.status(200).json({ message: 'Vous avez disliké cette sauce.' }))
                .catch((error) => res.status(400).json({ error }));
            }
            
            if (sauce.usersLiked.find(user => user === req.body.userId)) {
                Sauce.updateOne(
                    {_id: req.params.id },
                    { $pull: { usersLiked: req.body.userId },
                    $inc: {likes: -1}
                }
                )
                .then(() => res.status(200).json({ message: 'Vous avez disliké cette sauce.' }))
                .catch((error) => res.status(400).json({ error }));
            }
        
    })
    }
    
    
};