const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

// Place an order
const placeOrder = async (req, res) => {
    const { userId,shippingAddress } = req.body;
    try {
        const cart = await Cart.findOne({ userId}).populate("products.productId");

        if (!cart || cart.products.length === 0) return res.status(400).json({ msg: "Cart is empty" });

        let totalPrice = 0;
        const orderItems = cart.products.map(item => {
            totalPrice += item.quantity * item.productId.price;
            return {
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price
            };
        });

        const newOrder = new Order({
            userId,
            products: orderItems,
            totalPrice,
            shippingAddress
        });

        await newOrder.save();
        await Cart.findOneAndDelete({userId}); 

        res.status(201).json({ msg: "Order placed successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


module.exports = {placeOrder}
