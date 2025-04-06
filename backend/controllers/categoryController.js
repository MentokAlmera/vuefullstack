import db from '../models/index.js';
const { Category } = db;

const getCategoriesByRelationType = async (req, res) => {
    try {
        const { relationshipTypeId } = req.params;
        const categories = await Category.findAll({
            where: {
                relationship_type_id: relationshipTypeId
            }
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getCategoriesByRelationType
}; 