import express from 'express';
import db from '../models/index.js';

const router = express.Router();
const { Category } = db;

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get categories by relationship type ID
router.get('/relationship/:id', async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: {
                relationship_type_id: req.params.id
            }
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 