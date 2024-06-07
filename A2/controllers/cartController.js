const db = require('../models');
const Carts = db.Carts;
const Products = db.Products;
const Users = db.Users;

const placeItemInCart = async (req, res) => {
    try {
        const { productId, userId, quantity } = req.body;

        // Check if user exists
        const user = await Users.findOne({ where: { email: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if product exists
        const product = await Products.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if the cart item already exists
        const existingCartItem = await Carts.findOne({
            where: { productId, userId }
        });

        if (existingCartItem) {
            // If exists, update the quantity
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            res.status(200).json(existingCartItem);
        } else {
            // If not, create a new cart item
            const newCartItem = await Carts.create({ productId, userId, quantity });
            res.status(201).json(newCartItem);
        }
    } catch (error) {
        // Return error response
        res.status(500).json({ error: error.message });
    }
};

const deleteAllItemsForUser = async (req, res) => {
    try {
        const { userId } = req.body;

        // Check if user exists
        const user = await Users.findOne({ where: { email: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete all cart items for the user
        await Carts.destroy({ where: { userId } });

        // Return success response
        res.status(200).json({ message: 'All items deleted for the user' });
    } catch (error) {
        // Return error response
        res.status(500).json({ error: error.message });
    }
};

const getAllItemsForUser = async (req, res) => {
    try {
        const { userId } = req.query;

        // Check if user exists
        const user = await Users.findOne({ where: { email: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get all cart items for the user
        const cartItems = await Carts.findAll({
            where: { userId },
            
            include: [{ model: Products, attributes: ['id', 'name', 'img', 'price', 'special'], as: 'Product'}]
        });

        // Return success response
        res.status(200).json(cartItems);
    } catch (error) {
        // Return error response
        res.status(500).json({ error: error.message });
    }
};

const removeItemInCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Check if user exists
        const user = await Users.findOne({ where: { email: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if product exists
        const product = await Products.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Remove all records where userId and productId match
        const deleted = await Carts.destroy({ where: { userId, productId } });

        if (deleted) {
            res.status(200).json({ message: 'Item(s) removed from cart' });
        } else {
            res.status(404).json({ error: 'No matching item found in cart' });
        }
    } catch (error) {
        // Return error response
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    placeItemInCart,
    deleteAllItemsForUser,
    getAllItemsForUser,
    removeItemInCart,
};
