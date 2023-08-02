const express = require("express");
const router = express.Router();
const disciplineController = require("../../controllers/disciplineController");
//const verifyJWT = require("../../middlewares/verifyJWT");
const path = require("path");


/**
 * @swagger
 * components:
 *   schemas:
 *      Discipline:
 *          type: object
 *          require:
 *             - libelle
 *             - duree
 *          properties:
 *              libelle:
 *                  type: string
 *                  description: discipline libelle
 *              duree:
 *                  type: number
 *                  description: duree of discipline
 */


/**
 * @swagger
 * /api/discipline/disciplines:
 *   get:
 *      tags:
 *      - Disciplines
 *      summary: Returns a list of discipline
 *      description: discipline Who are already registered
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Discipline'
 *          404:
 *              description: no user was not found
 *      security:
 *          - bearerAuth: []
 *        
 */

/**
 * @swagger
 * /api/discipline/disciplines/{id}:
 *   get:
 *      tags:
 *       - Disciplines
 *      summary: Returns discipline by id
 *      description: get discipline Who are already exist
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The discipline id
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: object
 *                          item: 
 *                              $ref: '#/components/schemas/Discipline'
 *          404:
 *              description: The book was not found
 *      security:
 *          - bearerAuth: []
 *        
 */

/**
 * @swagger
 * /api/discipline/disciplines/{id}:
 *   delete:
 *      tags:
 *       - Disciplines
 *      summary: delete discipline by id
 *      description: delete discipline whose id specify
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *      responses:
 *       201:
 *         description: The discipline was deleted
 *       404:
 *         description: The discipline was not found
 *      security:
 *          - bearerAuth: []
 *        
 */

/**
 * @swagger
 * /api/discipline/disciplines/{id}:
 *   patch:
 *      tags:
 *       - Disciplines
 *      summary: update discipline by id
 *      description: update discipline whose id specify
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Discipline'
 *      responses:
 *       201:
 *         description: The discipline was deleted
 *       404:
 *         description: The discipline was not found
 *      security:
 *          - bearerAuth: []
 *        
 */



/**
 * @swagger
 * /api/discipline/created:
 *   post:
 *      tags:
 *       - Disciplines
 *      summary: create discipline
 *      description: create discipline from the application
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Discipline'
 *      responses:
 *       200:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Discipline'
 *         description: register success
 *       404:
 *         description: register failed
 *      security:
 *         - bearerAuth: []
 *      
 *        
 */

router.route("/disciplines").get(disciplineController.getDisciplines);
router.route("/disciplines/:id").get(disciplineController.getDiscipline);
router.route("/created").post(disciplineController.addDiscipline);
router.route("/disciplines/:id").delete(disciplineController.deleteDiscipline);
router.route("/disciplines/:id").patch(disciplineController.updateDiscipline);


module.exports = router;
