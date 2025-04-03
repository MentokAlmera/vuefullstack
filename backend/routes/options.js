import express from 'express';
const router = express.Router();

const options = {
    relationships: ['friend', 'family', 'stranger'],
    friendCategories: ['childhood', 'jhs', 'shs', 'college', 'online'],
    familyTypes: ['sister', 'brother', 'mother'],
    socialPlatforms: ['instagram', 'facebook', 'youtube']
};

// Get all options
router.get('/', (req, res) => {
    res.json(options);
});

// Get specific option type
router.get('/:type', (req, res) => {
    const { type } = req.params;
    if (options[type]) {
        res.json(options[type]);
    } else {
        res.status(404).json({ error: 'Option type not found' });
    }
});

export default router; 