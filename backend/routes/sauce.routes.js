const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); //import de la vérification de l'authentification
const sauceCtrl = require('../controllers/sauce.controller'); // import de la logique des sauces
const multer = require('../middleware/multer-config'); // import de notre fonction d'images


router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce);

module.exports = router;


