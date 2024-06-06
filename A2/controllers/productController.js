const db = require('../models');
const Products = db.Products;
const Reviews = db.Reviews;


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

const fetchProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Products.findOne({
            where: { id: productId },
            include: [{
                model: Reviews,
                // attributes: { exclude: ['createdAt'] }
            }]
        });
        if (product) {
            res.status(200).json({ reviews: product.Reviews });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    fetchAllProducts,
    fetchProductReviews,
};