const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController')
//const verifyJWT = require("../../middlewares/verifyJWT");
const path = require('path')
const verifyJWT = require("../../middlewares/verifyJWT");

/**
 * 
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - phone
 *         - role
 *         - pays
 *         - remain
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *         phone:
 *           type: string
 *           description: The user phone number
 *         role:
 *           type: string
 *           description: The user role
 *         remain:
 *           type: number
 *           description: The user remain
 *       example:
 *         id: d5fE_asz
 *         email: tony@gmail.com
 *         password: tony123
 *         phone: tony123
 *         role: client
 *         remain: null
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *      tags:
 *        - authentification
 *      summary: connect user
 *      description: connect user from the application
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *       200:
 *         description: connexion success
 *       404:
 *         description: connexion failed
 *      
 *        
 */


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *      tags:
 *        - authentification
 *      summary: create user
 *      description: register user from the application
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *       200:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *         description: register success
 *       404:
 *         description: register failed
 *      
 *        
 */

router
  .route("/login")
  .post(authController.handleLogin);
router.get("/logout", authController.handleLogout);
router.route("/register").post(authController.handleRegister);
  

module.exports = router