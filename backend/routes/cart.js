const express = require("express");
const { addToCart, getCartByUserId} = require("../controllers/cart.controller");


const router = express.Router();


/**
 * @swagger
 * /api/add-cart:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product added to cart
 *       400:
 *         description: Invalid request
 */
router.post("/add-cart", addToCart);


/**
 * @swagger
 * /api/get-cart/{userId}:
 *   get:
 *     summary: Get cart items for a user
 *     tags: [Cart]
 *     description: Retrieve all cart items for a given user by their userId.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose cart items need to be fetched.
 *     responses:
 *       200:
 *         description: Successfully retrieved cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 cartItems:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                       productName:
 *                         type: string
 *                       quantity:
 *                         type: number
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: Cart not found for the user
 */
router.get("/get-cart/:userId", getCartByUserId);

module.exports = router;
