const express = require("express");
const {
    createProduct,
    getAllProducts,
    getProductById,
} = require("../controllers/product.controller");

const router = express.Router();


/**
 * @swagger
 * /api/create-prod:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     description: Adds a new product to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product.
 *               description:
 *                 type: string
 *                 description: Product description.
 *               price:
 *                 type: number
 *                 description: Price of the product.
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error while creating product
 */
router.post("/create-prod", createProduct);


/**
 * @swagger
 * /api/get-prod:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     description: Retrieves a list of all available products.
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *       500:
 *         description: Server error while fetching products
 */
router.get("/get-prod", getAllProducts);


/**
 * @swagger
 * /api/get-prod/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     description: Retrieves details of a single product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve.
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error while fetching product
 */
router.get("/get-prod/:id", getProductById);


module.exports = router;
