const jwt = require('jsonwebtoken') // import de jsonWebToken pour vérifier les tokens

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // extrait le token du header "Authorization" de la requête entrante. Split permet de récupérer tout après Bearer
        const decodedToken = jwt.verify(token, process.env.SECRET); // verify permet de décoder notre token
        const userId = decodedToken.userId; // extraire l'ID de notre token
        if (req.body.userId && req.body.userId !== userId) { // comparons l'ID user à celui extrait
            throw 'User ID non valable !'; // erreur si c'est pas le cas
        } else {
            next(); // Si tout est bon, passe au middleware suivant
        }
    } 
    catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
}