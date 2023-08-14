const express = require("express");
const router = express.Router();
const testController = require("../../controllers/testController");
const verifyJWT = require("../../middlewares/verifyJWT");
const path = require("path");


/**
 * @swagger
 * components:
 *   schemas:
 *     Test:
 *       type: object
 *       required:
 *          - series
 *          - user
 *          - resultat
 *          - payload
 *          - createdAt
 *       properties:
 *          payload:
 *              type: string
 *              description: information of test
 *          series:
 *              type: array
 *              items:
 *                type: object
 *                required:
 *                    - id
 *                    - libelle
 *                    - questions
 *                properties:
 *                    id:
 *                      type: string
 *                      description: The auto-generated id of the user
 *                    libelle:
 *                      type: string
 *                      description: libelle of question
 *                    questions: 
 *                        type: array
 *                        items:
 *                             type: object
 *                             required:
 *                                 - libelle
 *                                 - consigne
 *                                 - suggestions
 *                                 - categorie
 *                                 - duree
 *                                 - discipline
 *                             properties:
 *                                  libelle:
 *                                      type: string
 *                                      description: question description
 *                                  consigne:
 *                                      type: string
 *                                      description: question description
 *                                  suggestions:
 *                                      type: array
 *                                      items: 
 *                                         type: object
 *                                         required:
 *                                             - text
 *                                             - isTrue
 *                                         properties:
 *                                            text:
 *                                                type: string
 *                                                description: suggestion text question
 *                                            isTrue:
 *                                                type: boolean
 *                                                description: check validite question
 *                                  discpline:
 *                                      type: object
 *                                      require:
 *                                         - libelle
 *                                         - duree
 *                                      properties:
 *                                             libelle:
 *                                                 type: string
 *                                                 description: discipline libelle
 *                                             duree:
 *                                                 type: number
 *                                                 description: duree of discipline
 *                                  categorie:
 *                                         type: object
 *                                         required:
 *                                                - libelle
 *                                                - point
 *                                         properties:
 *                                                libelle:
 *                                                      type: string
 *                                                      description: discipline libelle
 *                                                point:
 *                                                      type: number
 *                                                      description: duree of Categorie
 *                                  duree:
 *                                         type: number
 *                                         description: time of question
 *          user:         
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *                  - phone
 *                  - role
 *                  - remain
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto-generated id of the user
 *                  email:
 *                      type: string
 *                      description: The user email
 *                  password:
 *                      type: string
 *                      description: The user password
 *                  phone:
 *                      type: string
 *                      description: The user phone number
 *                  role:
 *                      type: string
 *                      description: The user role
 *                  remain:
 *                      type: number
 *                      description: The user remain
 *          resultat: 
 *              type: number
 *              description: resultat of test
 *          createdAt:
 *              type: string
 *              description: date create
 */


/**
 * @swagger
 * /api/test/tests/user-info:
 *   get:
 *      tags:
 *        - Tests
 *      summary: Return a current user test information
 *      description: get current user information test
 *      responses:
 *       200:
 *         description: test find success
 *       404:
 *         description: test was not found
 *      security:
 *          - bearerAuth: []
 *        
 */



/**
 * @swagger
 * /api/test/tests:
 *   get:
 *      tags:
 *       - Tests
 *      summary: Returns a list of tests
 *      description: tests Whose are already exist
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Test'
 *          404:
 *              description: no test was not found
 *      security:
 *          - bearerAuth: []
 *        
 */

/**
 * @swagger
 * /api/test/tests/{id}:
 *   get:
 *      tags:
 *       - Tests
 *      summary: Returns a list of tests
 *      description: test Who are already exist
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The test id
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Test'
 *          404:
 *              description: no question was not found
 *      security:
 *          - bearerAuth: []
 *        
 */


/**
 * @swagger
 * /api/test/tests/{id}:
 *   get:
 *      tags:
 *       - Tests
 *      summary: Returns a list of tests
 *      description: get test Who are already exist
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The test id
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Test'
 *          404:
 *              description: no test was found
 *      security:
 *          - bearerAuth: []
 *        
 */


/**
 * @swagger
 * /api/test/created:
 *   post:
 *      tags:
 *       - Tests
 *      summary: create test
 *      description: create test to the application
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Test'
 *      responses:
 *       200:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Test'
 *         description: add question success
 *       401:
 *         description: add question failed failed
 *      security:
 *         - bearerAuth: []
 *      
 *        
 */


/**
 * @swagger
 * /api/test/tests/{id}:
 *   delete:
 *      tags:
 *       - Tests
 *      summary: delete a list of tests
 *      description: delete test Who are already exist
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The test id
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Test'
 *          404:
 *              description: no test was found
 *      security:
 *          - bearerAuth: []
 *        
 */

/**
 * @swagger
 * /api/test/tests/{id}:
 *   patch:
 *      tags:
 *       - Tests
 *      summary: update a list of tests
 *      description: update test Who are already exist
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The test id
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Test'
 *          404:
 *              description: no test was found
 *      security:
 *          - bearerAuth: []
 *        
 */

router
  .route("/tests/user-info")
  .get(verifyJWT, testController.getTestCurrentUser);
router.route("/tests").get(verifyJWT, testController.getTests);
router.route("/tests/:id").get(verifyJWT, testController.getTest);
router.route("/created").post(verifyJWT, testController.addTest);
router.route("/tests/:id").delete(verifyJWT, testController.deleteTest);
router.route("/tests/:id").patch(verifyJWT, testController.updateTest);

module.exports = router;
