const jwt = require('jsonwebtoken') // import de jsonWebToken pour vérifier les tokens

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.spli(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } 
    catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
}