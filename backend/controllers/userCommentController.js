import db from '../models/index.js'; // Import the default export
const { User } = db; // Destructure the User model

const getAllComments = async (req, res, next) => {
    try {
        console.log('Fetching all comments...');
        const users = await User.findAll({ 
            where: { deleted_at: null },
            include: [
                { model: db.Friend, as: 'friends', where: { deleted_at: null }, required: false },
                { model: db.family, as: 'family', where: { deleted_at: null }, required: false },
                { model: db.Stranger, as: 'strangers', where: { deleted_at: null }, required: false }
            ],
            order: [['createdAt', 'DESC']]
        });
        console.log(`Found ${users.length} comments`);
        res.json(users);
    } catch (error) {
        console.error('Error in getAllComments:', error);
        next(error); // Pass error to Express error handler
    }
};

const addComment = async (req, res) => {
    try {
        const { firstName, lastName, comment, relationship, relationshipDetail } = req.body;
        if (!firstName || !lastName || !comment) {
            return res.status(400).json({ error: "All fields are required" });
        }
        
        // Create the user with the comment
        const user = await User.create({ 
            firstName, 
            lastName, 
            comment,
            relationship: relationship || null,
            relationshipDetail: relationshipDetail || null
        });
        
        res.json({ message: "Comment added successfully", user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Failed to add comment" });
    }
};

const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, comment, relationship, relationshipDetail } = req.body;
        if (!firstName || !lastName || !comment) {
            return res.status(400).json({ error: "All fields are required" });
        }
        
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "Comment not found" });
        }

        await user.update({ 
            firstName, 
            lastName, 
            comment,
            relationship: relationship || null,
            relationshipDetail: relationshipDetail || null
        });

        res.json({ message: "Comment updated successfully", user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Failed to update comment" });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Start a transaction to ensure all operations succeed or fail together
        const transaction = await db.sequelize.transaction();
        
        try {
            // Soft delete the user
            const [updatedUser] = await User.update(
                { deleted_at: new Date() }, 
                { where: { id }, transaction }
            );
            
            if (!updatedUser) {
                await transaction.rollback();
                return res.status(404).json({ error: "Comment not found" });
            }

            // Soft delete related records
            await Promise.all([
                db.Friend.update(
                    { deleted_at: new Date() },
                    { where: { userId: id }, transaction }
                ),
                db.family.update(
                    { deleted_at: new Date() },
                    { where: { userId: id }, transaction }
                ),
                db.Stranger.update(
                    { deleted_at: new Date() },
                    { where: { userId: id }, transaction }
                )
            ]);

            // Commit the transaction
            await transaction.commit();
            res.json({ message: "Comment and related records soft-deleted successfully" });
        } catch (error) {
            // If any error occurs, rollback the transaction
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Failed to delete comment" });
    }
};

export default { getAllComments, addComment, updateComment, deleteComment };
