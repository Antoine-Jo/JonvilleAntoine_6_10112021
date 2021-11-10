const express = require('express'); // import d'express
const mongoose = require('mongoose'); // import de mongoose

const userRoutes = require('./routes/user.routes'); // import de la route User



mongoose.connect('mongodb+srv://Antoine:DarkSidious10@cluster0.fklwd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Header qui permet d'accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //Ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // d'envoyer des requêtes avec les méthodes mentionnées
    next();
});

app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message : 'Votre requête a bien été reçu !' })
    next();
});

app.use((req, res) => {
    console.log('Réponse envoyée avec succès !');
})


app.use('/api/auth', userRoutes);

module.exports = app;