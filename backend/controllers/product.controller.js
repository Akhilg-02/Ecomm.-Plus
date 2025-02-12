const Product = require("../models/product.model");

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, images } = req.body;

        const product = new Product({ name, description, price, images });
        await product.save();

        res.status(201).json({ msg: "Product created successfully", product });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Get single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: "Product not found" });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {createProduct, getAllProducts, getProductById}
