const express = require("express");
const router = express.Router();
const questionEOController = require("../../controllers/questionEOController");
const verifyJWT = require("../../middlewares/verifyJWT");
const path = require("path");
const { uploadFiles } = require("../../middlewares/multer");

/**
 * @swagger
 * components:
 *   schemas:
 *      EOQuestion:
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
 *                        - fichier
 *                        - duree
 *                      properties:
 *                       numero:
 *                           type: number
 *                           description: task number
 *                       consigne:
 *                           type: string
 *                           description: task consigne
 *                       fichier:
 *                           type: string
 *                           description: task files
 *                       duree:
 *                           type: string
 *                           description: task duree
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
 *             - fichier
 *             - duree
 *         properties:
 *              numero:
 *                  type: number
 *                  description: numero question
 *              consigne:
 *                  type: string
 *                  description: question description
 *              fichier:
 *                  type: string
 *                  description: questions file
 *              duree:
 *                  type: string
 *                  description: question duree produciton
 *
 */

/**
 * @swagger
 * /api/eoQuestion/questions:
 *   get:
 *      tags:
 *       - EOQuestions
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
 *                              $ref: '#/components/schemas/EOQuestion'
 *          404:
 *              description: no question was not found
 *      security:
 *          - bearerAuth: []
 *
 */

/**
 * @swagger
 * /api/eoQuestion/questions/{id}:
 *   get:
 *      tags:
 *       - EOQuestions
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
 *                              $ref: '#/components/schemas/EOQuestion'
 *          404:
 *              description: no question was not found
 *      security:
 *          - bearerAuth: []
 *
 */

/**
 * @swagger
 * /api/eoQuestion/questions/{id}:
 *   get:
 *      tags:
 *       - EOQuestions
 *      summary: Returns question by id
 *      description: question Who are already exist
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The questionEO id
 *      responses:
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/EOQuestion'
 *          404:
 *              description: no questionEO was not found
 *      security:
 *          - bearerAuth: []
 *
 */

/**
 * @swagger
 * /api/eoQuestion/created:
 *   post:
 *      tags:
 *       - EOQuestions
 *      summary: create EOquestion
 *      description: create EOquestion to the application
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EOQuestion'
 *      responses:
 *       200:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EOQuestion'
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
 * /api/eoQuestion/questions/{id}:
 *   delete:
 *      tags:
 *       - EOQuestions
 *      summary: delete a EOquestions
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
 * /api/eoQuestion/questions/{id}:
 *   patch:
 *      tags:
 *       - EOQuestions
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
 *              $ref: '#/components/schemas/EOQuestion'
 *      responses:
 *          200:    # status code
 *              description: Successul Response
 *          404:
 *              description: question was not found
 *      security:
 *          - bearerAuth: []
 *
 */

router.route("/questions").get(verifyJWT, questionEOController.getEOQuestions);
router
  .route("/questions/:id")
  .get(verifyJWT, questionEOController.getEOQuestion);
router.post(
  "/created",
  /*uploadFiles*/ verifyJWT,
  questionEOController.addEOQuestion
);
router.patch(
  "/questions/:id",
  /*uploadFiles*/
  verifyJWT,
  questionEOController.updateEOQuestion
);
router
  .route("/questions/:id")
  .delete(verifyJWT, questionEOController.deleteEOQuestion);
router
  .route("/questions/:id")
  .patch(verifyJWT, questionEOController.updateEOQuestion);

module.exports = router;
