const express = require("express");
const router = express.Router();
const categorieController = require("../../controllers/categorieController");
const verifyJWT = require("../../middlewares/verifyJWT");
const path = require("path");

/**
 * @swagger
 * components:
 *   schemas:
 *      Categorie:
 *          type: object
 *          require:
 *             - libelle
 *             - point
 *          properties:
 *              libelle:
 *                  type: string
 *                  description: categorie libelle
 *              point:
 *                  type: number
 *                  description: point of categorie question
 */

/**
 * @swagger
 * /api/categorie/categories:
 *   get:
 *      tags:
 *      - Categories
 *      summary: Returns a list of categorie
 *      description: categorie Who are already registered
 *      responses:
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Categorie'
 *          404:
 *              description: no user was not found
 *      security:
 *          - bearerAuth: []
 *
 */

/**
 * @swagger
 * /api/categorie/categories/{id}:
 *   get:
 *      tags:
 *       - Categories
 *      summary: Returns categorie by id
 *      description: get categorie Who are already exist
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The categorie id
 *      responses:
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          item:
 *                              $ref: '#/components/schemas/Categorie'
 *          404:
 *              description: The book was not found
 *      security:
 *          - bearerAuth: []
 *
 */

/**
 * @swagger
 * /api/categorie/categories/{id}:
 *   delete:
 *      tags:
 *       - Categories
 *      summary: delete categorie by id
 *      description: delete categorie whose id specify
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *      responses:
 *       201:
 *         description: The categorie was deleted
 *       404:
 *         description: The categorie was not found
 *      security:
 *          - bearerAuth: []
 *
 */

/**
 * @swagger
 * /api/categorie/categories/{id}:
 *   patch:
 *      tags:
 *       - Categories
 *      summary: update categorie by id
 *      description: update categorie whose id specify
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
 *              $ref: '#/components/schemas/Categorie'
 *      responses:
 *       201:
 *         description: The categorie was deleted
 *       404:
 *         description: The categorie was not found
 *      security:
 *          - bearerAuth: []
 *
 */

/**
 * @swagger
 * /api/categorie/created:
 *   post:
 *      tags:
 *       - Categories
 *      summary: create categorie
 *      description: create categorie from the application
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Categorie'
 *      responses:
 *       200:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Categorie'
 *         description: register success
 *       404:
 *         description: register failed
 *      security:
 *         - bearerAuth: []
 *
 *
 */

router.route("/categories").get(verifyJWT, categorieController.getCategories);
router
  .route("/categories/:id")
  .get(verifyJWT, categorieController.getCategorie);
router.route("/created").post(verifyJWT, categorieController.addCategorie);
router
  .route("/categories/:id")
  .delete(verifyJWT, categorieController.deleteCategorie);
router
  .route("/categories/:id")
  .patch(verifyJWT, categorieController.updateCategorie);

module.exports = router;
