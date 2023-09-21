const express = require("express");
const router = express.Router();
const testController = require("../../controllers/testEEController");
const verifyJWT = require("../../middlewares/verifyJWT");
const path = require("path");

/**
 * @swagger
 * components:
 *   schemas:
 *     TestEE:
 *       type: object
 *       required:
 *          - series
 *          - user
 *          - resultat
 *          - status
 *          - payload
 *          - createdAt
 *       properties:
 *          payload:
 *              type: string
 *              description: information of test
 *          status:
 *              type: string
 *              description: status of test
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
 *              type: array
 *              items:
 *                  type: object
 *                  required:
 *                      - task
 *                      - note
 *                  properties:
 *                     task:
 *                         type: string
 *                         description: task text question
 *                     note:
 *                         type: number
 *                         description: note question
 *          createdAt:
 *              type: string
 *              description: date create
 */

/**
 * @swagger
 * /api/eeTest/tests/user-info:
 *   get:
 *      tags:
 *        - EETests
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

/** @swagger
 * /api/eeTest/tests/user-info/{id}:
 *   get:
 *      tags:
 *        - EETests
 *      summary: Return a current user test information
 *      description: get current user information test
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
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
 * /api/eeTest/tests:
 *   get:
 *      tags:
 *       - EETests
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
 *                              $ref: '#/components/schemas/TestEE'
 *          404:
 *              description: no test was not found
 *      security:
 *          - bearerAuth: []
 *
 */

/**
 * @swagger
 * /api/eeTest/tests/{id}:
 *   get:
 *      tags:
 *       - EETests
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
 *                              $ref: '#/components/schemas/TestEE'
 *          404:
 *              description: no question was not found
 *      security:
 *          - bearerAuth: []
 *
 */

/**
 * @swagger
 * /api/eeTest/tests/{id}:
 *   get:
 *      tags:
 *       - EETests
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
 *                              $ref: '#/components/schemas/TestEE'
 *          404:
 *              description: no test was found
 *      security:
 *          - bearerAuth: []
 *
 */

/**
 * @swagger
 * /api/eeTest/created:
 *   post:
 *      tags:
 *       - EETests
 *      summary: create test
 *      description: create test to the application
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                serie:
 *                  type: string
 *                user:
 *                  type: string
 *                status:
 *                  type: string
 *                resultat:
 *                  type: array
 *                  items:
 *                      type: object
 *                      required:
 *                          - task
 *                          - note
 *                      properties:
 *                         task:
 *                             type: string
 *                             description: task text question
 *                         note:
 *                             type: number
 *                             description: note question
 *                payload:
 *                  type: string
 *      responses:
 *       200:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TestEE'
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
 * /api/eeTest/tests/{id}:
 *   delete:
 *      tags:
 *       - EETests
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
 *                              $ref: '#/components/schemas/TestEE'
 *          404:
 *              description: no test was found
 *      security:
 *          - bearerAuth: []
 *
 */

/**
 * @swagger
 * /api/eeTest/tests/{id}:
 *   patch:
 *      tags:
 *       - EETests
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
 *                              $ref: '#/components/schemas/TestEE'
 *          404:
 *              description: no test was found
 *      security:
 *          - bearerAuth: []
 *
 */

router
  .route("/tests/user-info")
  .get(verifyJWT, testController.getEETestCurrentUser);
router
  .route(`/tests/user-info/:id`)
  .get(verifyJWT, testController.getEETestByUserId);
router.route("/tests").get(verifyJWT, testController.getEETests);
router.route("/tests/:id").get(verifyJWT, testController.getEETest);
router.route("/created").post(verifyJWT, testController.addEETest);
router.route("/tests/:id").delete(verifyJWT, testController.deleteEETest);
router.route("/tests/:id").patch(verifyJWT, testController.updateEETest);

module.exports = router;
