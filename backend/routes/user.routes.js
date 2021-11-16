const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");

/**
 * @openapi
 * /signup:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: le nom de l'utilisateur.
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: succes
 *         schema:
 *           type: object
 *           properties:
 *              msg:
 *                 type: "string"
 *       400:
 *         description: failed
 *         schema:
 *           type: object
 *           properties:
 *              msg:
 *                 type: "string"
 */
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
