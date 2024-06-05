const db = require('../models');
const Users = db.Users;
const Orders = db.Orders;
const OrderProducts = db.OrderProducts;

const placeOrder = async (req, res) => {
    try {
        const { email, products } = req.body;

        // Check if user exists
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create new order
        const newOrder = await Orders.create({ userId: email });

        // Add products to the order
        for (const product of products) {
            const { productId, quantity, price } = product;
            await OrderProducts.create({
                OrderId: newOrder.OrderId,
                productId,
                quantity,
                price
            });
        }

        // Return success response
        res.status(201).json({ message: 'Order placed successfully', orderId: newOrder.OrderId });
    } catch (error) {
        // Return error response
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    placeOrder
};