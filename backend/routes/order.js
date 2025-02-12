const express = require("express");
const { placeOrder} = require("../controllers/order.controller");


const router = express.Router();



/**
 * @swagger
 * /api/place-order:
 *   post:
 *     summary: Place an order
 *     tags: [Order]
 *     description: Creates a new order for the user with selected products.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user placing the order.
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     price:
 *                       type: number
 *               shippingAddress:
 *                 type: string
 *                 description: The address where the order should be delivered.
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error while placing order
 */
router.post("/place-order", placeOrder);

module.exports = router;
