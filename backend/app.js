const express = require('express'); // import d'express
const helmet = require('helmet'); // import de Helmet
const mongoose = require('mongoose'); // import de mongoose
const path = require('path') // import du chemin pour les images

const userRoutes = require('./routes/user.routes'); // import de la route User
const sauceRoutes = require('./routes/sauce.routes'); // import de la route Sauce

const app = express();

app.use(helmet());

mongoose.connect('mongodb+srv://Antoine:darksidious10@cluster0.fklwd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Header qui permet d'accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //Ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // d'envoyer des requêtes avec les méthodes mentionnées
    next();
});

app.use(express.json());


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;