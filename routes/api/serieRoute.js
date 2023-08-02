const express = require("express");
const router = express.Router();
const serieController = require("../../controllers/serieController");
//const verifyJWT = require("../../middlewares/verifyJWT");
const path = require("path");


/**
 * @swagger
 * components:
 *   schemas:
 *     Serie:
 *       type: object
 *       required:
 *         - test
 *         - user
 *         - resultat
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         tests:
 *            type: array
 *            items:
 *              type: object
 *              required:
 *                  - questions
 *                  - user
 *                  - resultat
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto-generated id of the user
 *                  questions: 
 *                      type: array
 *                      items:
 *                          type: object
 *                          required:
 *                              - libelle
 *                              - consigne
 *                              - suggestions
 *                              - categorie
 *                              - duree
 *                              - discipline
 *                      properties:
 *                          libelle:
 *                              type: string
 *                              description: question description
 *                          consigne:
 *                              type: string
 *                              description: question description
 *                          suggestions:
 *                              type: array
 *                              items: 
 *                                  type: object
 *                                  required:
 *                                      - text
 *                                      - isTrue
 *                                  properties:
 *                                      text:
 *                                          type: string
 *                                          description: suggestion text question
 *                                      isTrue:
 *                                          type: bool
 *                                          description: check validite question 
 *                                  discipline:
 *                                          type: object
 *                                          required:
 *                                              - libelle
 *                                              - duree
 *                                          properties:
 *                                              libelle:
 *                                              type: string
 *                                              description: discipline libelle
 *                                          duree:
 *                                              type: number
 *                                              description: duree of discipline
 *                                  duree:
 *                                          type: number
 *                                          description: time of question
 *         user:
 *          type: object
 *          required:
 *              - email
 *              - password
 *              - phone
 *              - role
 *              - remain
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the user
 *              email:
 *                  type: string
 *                  description: The user email
 *              password:
 *                  type: string
 *                  description: The user password
 *              phone:
 *                  type: string
 *                  description: The user phone number
 *              role:
 *                  type: string
 *                  description: The user role
 *              remain:
 *                  type: number
 *                  description: The user remain
 *         resultat: 
 *              type: number
 *              description: resultat of test
 */

/**
 * @swagger
 * /api/serie/series/user-info:
 *   get:
 *      tags:
 *       - Series
 *      summary: Return a current user serie information
 *      description: get current user serie information 
 *      responses:
 *       responses: 
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Serie'
 *       404:
 *         description: series was not found
 *      security:
 *          - bearerAuth: []
 *        
 */



/**
 * @swagger
 * /api/serie/series:
 *   get:
 *      tags:
 *       - Series
 *      summary: Returns a list of tests
 *      description: series Whose are already exist
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
 *              description: no serie was not found
 *      security:
 *          - bearerAuth: []
 *        
 */

/**
 * @swagger
 * /api/serie/series/{id}:
 *   get:
 *      tags:
 *       - Series
 *      summary: Returns a serie by id
 *      description: serie Who are already exist
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The serie id
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Serie'
 *          404:
 *              description: no serie was not found
 *      security:
 *          - bearerAuth: []
 *        
 */




/**
 * @swagger
 * /api/serie/created:
 *   post:
 *      tags:
 *       - Series
 *      summary: create new serie
 *      description: create serie from current user
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Serie'
 *      responses:
 *       200:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Serie'
 *         description: add serie success
 *       401:
 *         description: add serie failed failed
 *      security:
 *         - bearerAuth: []
 *      
 *        
 */

/**
 * @swagger
 * /api/serie/series/{id}:
 *   delete:
 *      tags:
 *       - Series
 *      summary: delete a serie
 *      description: delete series
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The serie id
 *      responses: 
 *          201:    # status code
 *              description: Successul Response
 *          500:
 *              description: bad request
 *      security:
 *          - bearerAuth: []
 *        
 */

/**
 * @swagger
 * /api/serie/series/{id}:
 *   patch:
 *      tags:
 *       - Series
 *      summary: update a serie
 *      description: update serie
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The serie id
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Serie'
 *      responses: 
 *          201:    # status code
 *              description: Successul Response
 *          500:
 *              description: bad request
 *      security:
 *          - bearerAuth: []
 *        
 */

router.route("/series/user-info").get(serieController.getSerieCurrentUser);
router.route("/series").get(serieController.getSeries);
router.route("/series/:id").get(serieController.getSerie);
router.route("/created").post(serieController.addSerie);
router.route("/series/:id").delete(serieController.deleteSerie);
router.route("/series/:id").patch(serieController.updateSerie);

module.exports = router;
