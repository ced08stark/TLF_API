const express = require("express");
const router = express.Router();
const adsController = require("../../controllers/adsController");
//const verifyJWT = require("../../middlewares/verifyJWT");
const path = require("path");
const verifyJWT = require("../../middlewares/verifyJWT");



/**
 * 
 * @swagger
 * components:
 *   schemas:
 *     Ads:
 *       type: object
 *       required:
 *         - nomPrestation
 *         - linkTarget
 *         - startDate
 *         - endDate
 *         - adsPicture
 *         - countClic
 *         - localisation
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         nomPrestation:
 *           type: string
 *           description: The ads prestataire
 *         linkTarget:
 *           type: string
 *           description: The ads prestataire
 *         startDate:
 *           type: date
 *           description: The start date from ads
 *         endDate:
 *           type: date
 *           description: The end date drom ads
 *         adsPicture:
 *           type: string
 *           description: The adsPicture
 *         localisation:
 *           type: string
 *           description: The location from prestataire
 *         countClic:
 *           type: number
 *           description: The ads count clic
 */


/**
 * @swagger
 * /api/ads/ads:
 *   get:
 *      tags:
 *      - Ads
 *      summary: Returns a list of ads
 *      description: ads Who are already registered
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Ads'
 *          404:
 *              description: no ads was not found
 *      security:
 *          - bearerAuth: []
 *        
 */



/**
 * @swagger
 * /api/ads/ads/{id}:
 *   get:
 *      tags:
 *       - Ads
 *      summary: Returns ads by id
 *      description: get ads Who are already exist
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ads id
 *      responses: 
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: object
 *                          item: 
 *                              $ref: '#/components/schemas/Ads'
 *          404:
 *              description: The ads was not found
 *      security:
 *          - bearerAuth: []
 *        
 */


/**
 * @swagger
 * /api/ads/created:
 *   post:
 *      tags:
 *       - Ads
 *      summary: create ads
 *      description: create ads from the application
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Ads'
 *      responses:
 *       200:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Ads'
 *         description: register success
 *       404:
 *         description: register failed
 *      security:
 *         - bearerAuth: []
 *            
 */

/**
 * @swagger
 * /api/ads/ads/{id}:
 *   patch:
 *      tags:
 *       - Ads
 *      summary: update a ads
 *      description: update ads
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ads id
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Ads'
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
 * /api/ads/ads/{id}:
 *   delete:
 *      tags:
 *       - Ads
 *      summary: delete ads by id
 *      description: delete ads whose id specify
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *      responses:
 *       201:
 *         description: The ads was deleted
 *       404:
 *         description: The ads was not found
 *      security:
 *          - bearerAuth: []
 *        
 */




router.route("/ads")
  .get(verifyJWT, adsController.getAllAds);
router.route("/ads/:id").get(verifyJWT, adsController.getAds);
router.route("/created").post(verifyJWT, adsController.addAds);
router.route("/ads/:id").patch(verifyJWT, adsController.updateAds);
router.route("/ads/:id").delete(verifyJWT, adsController.deleteAds);

module.exports = router;
