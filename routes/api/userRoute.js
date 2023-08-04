const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
//const verifyJWT = require("../../middlewares/verifyJWT");
const path = require("path");

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
 *         pays: cameroun
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

router.route("/users/user-info").get(userController.getCurrentUser);
router.route("/users").get(userController.getUsers);
router.route("/users/:id").get(userController.getUser);
router.route("/users/:id").delete(userController.deleteUser);
router.route("/users/:id").patch(userController.updateUser);
router.route("/check-subscrire").get(userController.checkRemain);


module.exports = router;
