const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middlewares/verifyJWT");

/**
 * @swagger
 * components:
 *   schemas:
 *      Payment:
 *          type: object
 *          require:
 *             - amount
 *             - currency
 *             - description
 *             - reference
 *          properties:
 *              amount:
 *                  type: string
 *                  description: field of description
 *              currency:
 *                  type: string
 *                  description: field of currency
 *              description:
 *                  type: string
 *                  description: field of description
 *              reference:
 *                  type: string
 *                  description: field of reference
 */


/**
 * @swagger
 * /api/payment/payments/{ref}:
 *   get:
 *      tags:
 *       - Payments
 *      summary: Returns payment by reference
 *      description: get payment Who are already exist
 *      parameters:
 *       - in: path
 *         name: reference
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment reference
 *      responses:
 *          200:    # status code
 *              description: Successul Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          item:
 *                              $ref: '#/components/schemas/Payments'
 *          404:
 *              description: The book was not found
 *      security:
 *          - bearerAuth: []
 *
 */


/**
 * @swagger
 * /api/payments/initialize:
 *   post:
 *      tags:
 *       - Payments
 *      summary: create payment
 *      description: create payment from the application
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Payment'
 *      responses:
 *       200:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Payment'
 *         description: register success
 *       404:
 *         description: register failed
 *      security:
 *         - bearerAuth: []
 *      
 *        
 */

const paymentController = require("../../controllers/paymentController");

router
  .route("/payments/initialize")
  .post(verifyJWT, paymentController.initPayments);

router
  .route("/payments/:ref")
  .get(verifyJWT, paymentController.checkPayments);




module.exports = router;