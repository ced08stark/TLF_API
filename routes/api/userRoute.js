const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const verifyJWT = require("../../middlewares/verifyJWT");
const path = require("path");
const paymentController = require("../../controllers/paymentController");
/**
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
 *         - codePromo
 *         - parrain
 *         - filleuls
 *         - solde
 *         - isOnline
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
 *         pays:
 *           type: string
 *           desciption: the user country
 *         isOnline:
 *           type: boolean
 *           desciption: the user online
 *         codePromo:
 *           type: string
 *           desciption: the user codePromo
 *         parrain:
 *           type: string
 *           desciption: the user parrain
 *         solde:
 *           type: number
 *           desciption: the user solde
 *         remain:
 *           type: number
 *           description: The user remain
 *       example:
 *         id: d5fE_asz
 *         email: tony@gmail.com
 *         password: tony123
 *         phone: tony123
 *         role: client
 *         pays: cameroun
 *         isOnline: false
 *         remain: null
 */

/**
 * @swagger
 * /api/user/users/user-info:
 *   get:
 *      tags:
 *        - Users
 *      summary: Returns a current user information
 *      description: get current user information
 *      responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 *      security:
 *          - bearerAuth: []
 *        
 */

/**
 * @swagger
 * /api/user/users:
 *   get:
 *      tags:
 *        - Users
 *      summary: Returns a list of users
 *      description: user Who are already registered
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/User'
 *          404:
 *              description: no user was not found
 *      security:
 *          - bearerAuth: []
 *        
 */


/**
 * @swagger
 * /api/user/users/{id}:
 *   get:
 *      tags:
 *        - Users
 *      summary: Returns user by id
 *      description: user Who are already registered
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/User'
 *          404:
 *              description: The user was not found
 *      security:
 *          - bearerAuth: []
 *        
 */



/**
 * @swagger
 * /api/user/users/{id}:
 *   delete:
 *      tags:
 *        - Users
 *      summary: delete user by id
 *      description: delete user whose id specify
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *      responses:
 *       201:
 *         description: The user was deleted
 *       404:
 *         description: The usesr was not found
 *      security:
 *          - bearerAuth: []
 *        
 */


/**
 * @swagger
 * /api/user/users/{id}:
 *   patch:
 *      tags:
 *        - Users
 *      summary: delete user by id
 *      description: delete user whose id specify
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *      requestBody:
 *        require: true
 *        content:
 *            application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *       201:
 *         description: The user was update
 *       404:
 *         description: The user was not found
 *      security:
 *          - bearerAuth: []
 *        
 */


/**
 * @swagger
 * /api/user/users/{id}:
 *   patch:
 *      tags:
 *        - Users
 *      summary: delete user by id
 *      description: delete user whose id specify
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *      requestBody:
 *        require: true
 *        content:
 *            application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *       201:
 *         description: The user was update
 *       404:
 *         description: The user was not found
 *      security:
 *          - bearerAuth: []
 *        
 */


/**
 * @swagger
 * /api/user/check-subscrire:
 *   get:
 *      tags:
 *        - Users
 *      summary: check remain date 
 *      description: check remain and get remain day
 *      responses:
 *       200:
 *         description: request success 
 *       500:
 *         description: bad request
 *      security:
 *          - bearerAuth: []
 *        
 */

/**
 * @swagger
 * /api/user/check-parrainCode:
 *   post:
 *      tags:
 *        - Users
 *      summary: check codeParrain 
 *      description: check codeParrain
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                codeParrain:
 *                  type: string
 *      responses:
 *       200:
 *         description: request success 
 *       500:
 *         description: bad request
 *        
 */

/**
 * @swagger
 * /api/user/users/activeAccount:
 *   post:
 *      tags:
 *        - Users
 *      summary: active account
 *      description: connect user from the application
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                userEmail:
 *                  type: string
 *                days:
 *                  type: number
 *      responses:
 *       200:
 *         description: account actived success
 *       404:
 *         description: account actived failed
 *      
 *        
 */


router.route("/check-parrainCode").post(userController.checkCodeParrain);
router.route("/check-subscrire").get(verifyJWT, userController.checkRemain);
router.route("/users/user-info").get(verifyJWT, userController.getCurrentUser);
router.route("/users").get(verifyJWT, userController.getUsers);
router.route("/users/:id").get(verifyJWT, userController.getUser);

router
  .route("/users/activeAccount")
  .post(verifyJWT, paymentController.activeUserAccount);
router.route("/users/:id").delete(verifyJWT, userController.deleteUser);
router.route("/users/:id").patch(verifyJWT, userController.updateUser);



module.exports = router;
