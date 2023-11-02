const express = require("express");
const router = express.Router();

const {
  sendOTP,
  verifyOTP,
  sendPasswordResetOtpEmail,
} = require("../../controllers/authController");


/**
 * 
 * @swagger
 * components:
 *   schemas:
 *     OTP:
 *       type: object
 *       required:
 *         - email
 *         - subject
 *         - message
 *         - duration
 *       properties:
 *         email:
 *           type: string
 *           description: The address mail of user
 *         subject:
 *           type: string
 *           description: The subject of otp mail
 *         message:
 *           type: string
 *           description: The message of otp mail
 *         duration:
 *           type: number
 *           description: The duration of otp code
 *
 *
 */


/**
 * @swagger
 * /api/otp/sendOTP:
 *   post:
 *      tags:
 *        - OTP
 *      summary: email otp
 *      description: connect user from the application
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OTP'
 *      responses:
 *       200:
 *         description: otp send
 *       404:
 *         description: otp failed
 *      
 *        
 */



/**
 * @swagger
 * /api/otp/verify:
 *   post:
 *      tags:
 *        - OTP
 *      summary: email otp
 *      description: connect user from the application
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                email:
 *                  type: string
 *                otp:
 *                  type: string
 *      responses:
 *       200:
 *         description: otp send
 *       404:
 *         description: otp failed
 *      
 *        
 */

/**
 * @swagger
 * /api/otp/forgot-password:
 *   post:
 *      tags:
 *        - OTP
 *      summary: forgot password otp
 *      description: connect user from the application
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                email:
 *                  type: string
 *      responses:
 *       200:
 *         description: otp forgot password send
 *       404:
 *         description: otp forgot password failed
 *      
 *        
 */




router.post("/verify", verifyOTP);
router.post("/forgot-password", sendPasswordResetOtpEmail);
router.post('/sendOTP', sendOTP);

module.exports = router;