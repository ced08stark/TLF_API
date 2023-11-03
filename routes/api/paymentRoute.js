const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middlewares/verifyJWT");

/**
 * @swagger
 * components:
 *   schemas:
 *      PaymentMobile:
 *          type: object
 *          require:
 *             - amount
 *             - currency
 *             - description
 *             - reference
 *             - phone
 *             - channel
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
 *              phone:
 *                  type: string
 *                  description: field of reference
 *              channel:
 *                  type: string
 *                  description: field of channel
 */


/**
 * @swagger
 * components:
 *   schemas:
 *      PaymentPaypal:
 *          type: object
 *          require:
 *             - amount
 *             - currency
 *             - description
 *             - reference
 *             - paypalEmail
 *             - channel
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
 *              phone:
 *                  type: string
 *                  description: field of reference
 *              paypalEmail:
 *                  type: string
 *                  description: field of reference
 *              channel:
 *                  type: string
 *                  description: field of channel
 */

/**
 * @swagger
 * components:
 *   schemas:
 *      PaymentCard:
 *          type: object
 *          require:
 *             - amount
 *             - currency
 *             - description
 *             - reference
 *             - name
 *             - card_number
 *             - exp
 *             - cvc
 *             - channel
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
 *              name: 
 *                  type: string
 *                  description: field of card name   
 *              cvc:
 *                  type: string
 *                  description: field of cvc
 *              card_number:
 *                  type: string
 *                  description: field of card
 *              exp:
 *                  type: string
 *                  description: field of exp
 *              channel:
 *                  type: string
 *                  description: field of channel
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
 * /api/payments/subscription:
 *   post:
 *      tags:
 *       - Payments
 *      summary: active subscription
 *      description: active subscription from the offer
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                amount:
 *                  type: string
 *                reference:
 *                  type: string
 *      responses:
 *       200:
 *         description: subscription success
 *       404:
 *         description: subscription failed
 *      security:
 *         - bearerAuth: []
 *      
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
 *              $ref: '#/components/schemas/PaymentMobile'
 *      responses:
 *       200:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PaymentMobile'
 *         description: register success
 *       404:
 *         description: register failed
 *      security:
 *         - bearerAuth: []
 *      
 *        
 */


/**
 * @swagger
 * /api/payments/initializeCard:
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
 *              $ref: '#/components/schemas/PaymentCard'
 *      responses:
 *       200:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PaymentCard'
 *         description: register success
 *       404:
 *         description: register failed
 *      security:
 *         - bearerAuth: []
 *      
 *        
 */

/**
 * @swagger
 * /api/payments/initializePaypal:
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
 *              $ref: '#/components/schemas/PaymentPaypal'
 *      responses:
 *       200:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PaymentPaypal'
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
  .route("/payments/subscription")
  .post(verifyJWT, paymentController.activeAccount);

router
  .route("/payments/initializeCard")
  .post(verifyJWT, paymentController.initCardPayment);

router
  .route("/payments/initializePaypal")
  .post(verifyJWT, paymentController.initPaypalPayment);

router
  .route("/payments/:ref")
  .get(verifyJWT, paymentController.checkPayments);




module.exports = router;