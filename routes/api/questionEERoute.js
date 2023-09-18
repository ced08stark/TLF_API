const express = require("express");
const router = express.Router();
const questionEEController = require("../../controllers/questionEEController");
const verifyJWT = require("../../middlewares/verifyJWT");
const path = require("path");
const { uploadFiles } = require("../../middlewares/multer");

/**
 * @swagger
 * components:
 *   schemas:
 *      EEQuestion:
 *         type: object
 *         required:
 *             - tasks
 *         properties:
 *              tasks:
 *                  type: array
 *                  items:
 *                      type: object
 *                      required:
 *                        - numero
 *                        - consigne
 *                        - images
 *                        - typeProduction
 *                      properties:
 *                       numero:
 *                           type: number
 *                           description: task number
 *                       consigne:
 *                           type: string
 *                           description: task consigne
 *                       images:
 *                           type: string
 *                           description: task images
 *                       typeProduction:
 *                           type: string
 *                           description: task productionType
 *                        
 *                  
 *
 */


/**
 * @swagger
 * components:
 *   schemas:
 *      tasks:
 *         type: object
 *         required:
 *             - numero
 *             - consigne
 *             - images
 *             - typeProduction
 *         properties:
 *              numero:
 *                  type: number
 *                  description: numero question
 *              consigne:
 *                  type: string
 *                  description: question description
 *              images:
 *                  type: array
 *                  items: 
 *                     type: string
 *                     description: questions images
 *              typeProduction:
 *                  type: string
 *                  description: question type produciton
 *
 */

/**
 * @swagger
 * /api/eeQuestion/questions:
 *   get:
 *      tags:
 *       - EEQuestions
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
 *                              $ref: '#/components/schemas/EEQuestion'
 *          404:
 *              description: no question was not found
 *      security:
 *          - bearerAuth: []
 *
 */

/**
 * @swagger
 * /api/eeQuestion/questions/{id}:
 *   get:
 *      tags:
 *       - EEQuestions
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
 *                              $ref: '#/components/schemas/EEQuestion'
 *          404:
 *              description: no question was not found
 *      security:
 *          - bearerAuth: []
 *
 */

/**
 * @swagger
 * /api/eeQuestion/questions/{id}:
 *   get:
 *      tags:
 *       - EEQuestions
 *      summary: Returns question by id
 *      description: question Who are already exist
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The questionEE id
 *      responses:
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/EEQuestion'
 *          404:
 *              description: no questionEE was not found
 *      security:
 *          - bearerAuth: []
 *
 */

/**
 * @swagger
 * /api/eeQuestion/created:
 *   post:
 *      tags:
 *       - EEQuestions
 *      summary: create EEquestion
 *      description: create EEquestion to the application
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EEQuestion'
 *      responses:
 *       200:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EEQuestion'
 *         description: add question success
 *       401:
 *         description: add EEquestion failed failed
 *      security:
 *         - bearerAuth: []
 *
 *
 */

/**
 * @swagger
 * /api/eeQuestion/questions/{id}:
 *   delete:
 *      tags:
 *       - EEQuestions
 *      summary: delete a EEquestions
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
 * /api/eeQuestion/questions/{id}:
 *   patch:
 *      tags:
 *       - EEQuestions
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
 *              $ref: '#/components/schemas/EEQuestion'
 *      responses:
 *          200:    # status code
 *              description: Successul Response
 *          404:
 *              description: question was not found
 *      security:
 *          - bearerAuth: []
 *
 */

router.route("/questions").get(verifyJWT, questionEEController.getEEQuestions);
router
  .route("/questions/:id")
  .get(verifyJWT, questionEEController.getEEQuestion);
router.post(
  "/created",
  /*uploadFiles*/ verifyJWT,
  questionEEController.addEEQuestion
);
router.patch(
  "/questions/:id",
  /*uploadFiles*/
  verifyJWT,
  questionEEController.updateEEQuestion
);
router
  .route("/questions/:id")
  .delete(verifyJWT, questionEEController.deleteEEQuestion);
router
  .route("/questions/:id")
  .patch(verifyJWT, questionEEController.updateEEQuestion);

module.exports = router;
