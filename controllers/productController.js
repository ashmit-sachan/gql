const db = require('../models');
const Products = db.Products;


const fetchAllProducts = async (req, res) => {
    try {
        // Fetch all Products
        const products = await Products.findAll({
            attributes: { exclude: ['createdAt'] }
        });

        // Return success response
        res.status(200).json({products: products});
    } catch (error) {
        // Return error response
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    fetchAllProducts,
};