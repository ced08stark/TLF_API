const express = require("express");
const router = express.Router();
const questionController = require("../../controllers/questionController");
const verifyJWT = require("../../middlewares/verifyJWT");
const path = require("path");
const {uploadFiles} = require("../../middlewares/multer")


/**
 * @swagger
 * components:
 *   schemas:
 *      Question:
 *         type: object
 *         required:
 *             - numero
 *             - libelle
 *             - consigne
 *             - suggestions
 *             - categorie
 *             - duree
 *             - discipline
 *         properties:
 *              numero:
 *                  type: number
 *                  description: numero question
 *              libelle:
 *                  type: string
 *                  description: question description
 *              consigne:
 *                  type: string
 *                  description: question description
 *              suggestions:
 *                  type: array
 *                  items: 
 *                     type: object
 *                     required:
 *                         - text
 *                         - isTrue
 *                     properties:
 *                        text:
 *                            type: string
 *                            description: suggestion text question
 *                        isTrue:
 *                            type: boolean
 *                            description: check validite question
 *              categorie:
 *                  type: string
 *                  description: question categorie
 *              duree:
 *                  type: number
 *                  description: question time
 *              discpline:
 *                  type: object
 *                  require:
 *                     - libelle
 *                     - duree
 *                  properties:
 *                      libelle:
 *                         type: string
 *                         description: discipline libelle
 *                      duree:
 *                          type: number
 *                          description: duree of discipline
 *            
 */

/**
 * @swagger
 * /api/question/questions:
 *   get:
 *      tags:
 *       - Questions
 *      summary: Returns a list of questions
 *      description: question Who are already exist
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Question'
 *          404:
 *              description: no question was not found
 *      security:
 *          - bearerAuth: []
 *        
 */

/**
 * @swagger
 * /api/question/questions/{id}:
 *   get:
 *      tags:
 *       - Questions
 *      summary: Returns a list of questions
 *      description: question Who are already exist
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The question id
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Question'
 *          404:
 *              description: no question was not found
 *      security:
 *          - bearerAuth: []
 *        
 */


/**
 * @swagger
 * /api/question/questions/{id}:
 *   get:
 *      tags:
 *       - Questions
 *      summary: Returns question by id
 *      description: question Who are already exist
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The question id
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Question'
 *          404:
 *              description: no question was not found
 *      security:
 *          - bearerAuth: []
 *        
 */


/**
 * @swagger
 * /api/question/created:
 *   post:
 *      tags:
 *       - Questions
 *      summary: create question
 *      description: create question to the application
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Question'
 *      responses:
 *       200:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Question'
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
 * /api/question/questions/{id}:
 *   delete:
 *      tags:
 *       - Questions
 *      summary: delete a questions
 *      description: question Who are already exist
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The question id
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *          404:
 *              description: no question was not found
 *      security:
 *          - bearerAuth: []
 *        
 */

/**
 * @swagger
 * /api/question/questions/{id}:
 *   patch:
 *      tags:
 *       - Questions
 *      summary: update a question
 *      description: update question
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The question id
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Question'
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *          404:
 *              description: question was not found
 *      security:
 *          - bearerAuth: []
 *        
 */

router.route("/questions").get(verifyJWT, questionController.getQuestions);
router.route("/questions/:id").get(verifyJWT, questionController.getQuestion);
router.post("/created", /*uploadFiles*/verifyJWT, questionController.addQuestion);
router.patch(
  "/questions/:id",
  uploadFiles,
  verifyJWT,
  questionController.updateQuestion
);
router
  .route("/questions/:id")
  .delete(verifyJWT, questionController.deleteQuestion);

router
  .route("/questions/:id")
  .patch(verifyJWT, questionController.updateQuestion);

router
  .route("/file/:key")
  .get(questionController.readFile);

router.post("/upload", uploadFiles, questionController.upload);





module.exports = router;
