const db = require('../models');
const bcrypt = require('bcrypt');
const Users = db.Users;
const Products = db.Products;
const Orders = db.Orders;
const OrderProducts = db.OrderProducts;

const signUp = async (req, res) => {
    try {
        // Get user data from request body
        const { name, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        let data = await Users.create({
            name,
            email,
            password: hashedPassword,
        });

        let response = {
            data: 'ok',
            id: data.email
        };

        // Return success response
        res.status(200).json(response);
    } catch (error) {
        // Return error response
        res.status(500).json({ error: error.message });
    }
};

const signIn = async (req, res) => {
    try {
        // Get user data from request body
        const { email, password } = req.body;

        // Fetch user by email
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare password
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Return success response
        res.status(200).json({ id: user.email });
    } catch (error) {
        // Return error response
        res.status(500).json({ error: error.message });
    }
};

const fetchUserByEmail = async (req, res) => {
    try {
        // Get email from request body
        const { email } = req.body;

        // Fetch user by email without the 'blocked' field
        const user = await Users.findOne({
            where: { email },
            attributes: { exclude: ['blocked', 'password'] }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return success response
        res.status(200).json(user);
    } catch (error) {
        // Return error response
        res.status(500).json({ error: error.message });
    }
};

const editUser = async (req, res) => {
    try {
        // Get user data from request body
        const { email } = req.body;
        const { name, password } = req.body;

        // Fetch user by email
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user data
        if (name) {
            user.name = name;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        // Return success response
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        // Return error response
        res.status(500).json({ error: error.message });
    }
};

const fetchUserOrders = async (req, res) => {
    try {
        const { email } = req.body;

        // Fetch user by email to ensure user exists
        const user = await Users.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch orders for the user including order details
        const orders = await Orders.findAll({
            where: { userId: email },
            include: [{
                model: OrderProducts,
                include: [{
                    model: Products,
                    attributes: ['name', 'special', "img"]
                    // attributes: { exclude: ['createdAt'] } 
                }]
            }]
        });

        // Return success response
        res.status(200).json({ orders });
    } catch (error) {
        // Return error response
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    signUp,
    signIn,
    fetchUserByEmail,
    editUser,
    fetchUserOrders
};