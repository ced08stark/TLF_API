const express = require("express");
const router = express.Router();
const serieController = require("../../controllers/serieController");
const verifyJWT = require("../../middlewares/verifyJWT");
const path = require("path");


/**
 * @swagger
 * components:
 *   schemas:
 *     Serie:
 *       type: object
 *       required:
 *         - libelle
 *         - questions
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         libelle:
 *           type: string
 *           description: libelle of question
 *         questions: 
 *             type: array
 *             items:
 *                  type: object
 *                  required:
 *                      - libelle
 *                      - consigne
 *                      - suggestions
 *                      - categorie
 *                      - duree
 *                      - discipline
 *                  properties:
 *                       libelle:
 *                           type: string
 *                           description: question description
 *                       consigne:
 *                           type: string
 *                           description: question description
 *                       suggestions:
 *                           type: array
 *                           items: 
 *                              type: object
 *                              required:
 *                                  - text
 *                                  - isTrue
 *                              properties:
 *                                 text:
 *                                     type: string
 *                                     description: suggestion text question
 *                                 isTrue:
 *                                     type: boolean
 *                                     description: check validite question
 *                       discpline:
 *                           type: object
 *                           require:
 *                              - libelle
 *                              - duree
 *                           properties:
 *                                  libelle:
 *                                      type: string
 *                                      description: discipline libelle
 *                                  duree:
 *                                      type: number
 *                                      description: duree of discipline
 *                       categorie:
 *                              type: object
 *                              required:
 *                                     - libelle
 *                                     - point
 *                              properties:
 *                                     libelle:
 *                                           type: string
 *                                           description: discipline libelle
 *                                     point:
 *                                           type: number
 *                                           description: duree of Categorie
 *                       duree:
 *                              type: number
 *                              description: time of question
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
 *                              $ref: '#/components/schemas/Serie'
 *          404:
 *              description: no serie was not found
 *      security:
 *          - bearerAuth: []
 *        
 */

/**
 * @swagger
 * /api/serie/series/offline:
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
 *                              $ref: '#/components/schemas/Serie'
 *          404:
 *              description: no serie was not found
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

router.route("/series/offline").get(serieController.getSerie100);
router.route("/series").get(verifyJWT, serieController.getSeries);
router.route("/series/:id").get(verifyJWT, serieController.getSerie);
router.route("/created").post(verifyJWT, serieController.addSerie);
router.route("/series/:id").delete(verifyJWT, serieController.deleteSerie);
router.route("/series/:id").patch(verifyJWT, serieController.updateSerie);

module.exports = router;
