import express from 'express';
import commentRoutes from './commentRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import db from '../models/index.js';

const router = express.Router();
const { RelationshipType } = db;

// Get all relationship types
router.get('/relationship-types', async (req, res) => {
    try {
        const types = await RelationshipType.findAll();
        res.json(types);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mount routes
router.use('/comments', commentRoutes);
router.use('/categories', categoryRoutes);

export default router; 