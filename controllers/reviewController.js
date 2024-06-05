const db = require('../models');
const Reviews = db.Reviews;

const createReview = async (req, res) => {
    try {
        const { rating, review, productId, userId } = req.body;
        const newReview = await Reviews.create({ rating, review, productId, userId });
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Reviews.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, review } = req.body;
        const [updated] = await Reviews.update({ rating, review }, { where: { id } });
        if (updated) {
            const updatedReview = await Reviews.findOne({ where: { id } });
            res.status(200).json(updatedReview);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createReview,
    deleteReview,
    editReview,
};