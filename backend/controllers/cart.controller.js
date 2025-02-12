const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

// Add product to cart
const addToCart = async (req, res) => {
    const { userId, products } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        for (const item of products) {
            const { productId, quantity } = item;

            // Validate product exists
            const product = await Product.findById(productId);
            if (!product) return res.status(404).json({ msg: `Product with ID ${productId} not found` });

            const itemIndex = cart.products.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.products[itemIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json({ msg: "Products added to cart", cart });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Get cart items by userId
const getCartByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the cart for the given userId and populate product details
        const cart = await Cart.findOne({ userId }).populate("products.productId");

        if (!cart) {
            return res.status(404).json({ msg: "Cart not found for this user" });
        }

        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


module.exports = {addToCart,getCartByUserId}
