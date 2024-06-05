const db = require('../models');

const Users = db.Users;

const signUp = async (req, res) => {
    try {
        // Get user data from request body
        const { name, email, password } = req.body;

        // Create a new user instance
        let data = await Users.create({
            name,
            email,
            password,
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

module.exports = {
    signUp,
};