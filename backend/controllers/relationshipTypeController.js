import db from '../models/index.js';
const { RelationshipType } = db;

const getAllRelationshipTypes = async (req, res) => {
    try {
        console.log('Fetching all relationship types...');
        const types = await RelationshipType.findAll();
        console.log(`Found ${types.length} relationship types:`, types);
        res.json(types);
    } catch (error) {
        console.error('Error fetching relationship types:', error);
        res.status(500).json({ message: error.message });
    }
};

export default {
    getAllRelationshipTypes
}; 