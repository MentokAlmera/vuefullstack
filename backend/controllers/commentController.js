import db from '../models/index.js';
const { Comment, User, Category, RelationshipType } = db;

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    include: [{
                        model: RelationshipType,
                        as: 'relationship_type'
                    }]
                },
                {
                    model: Category,
                    as: 'category'
                }
            ],
            where: {
                deleted_at: null
            },
            order: [['created_at', 'DESC']]
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createComment = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
        const { firstname, lastname, relationship_type_id, category_id, comment } = req.body;
        const currentTime = new Date();

        // Find existing user or create new one
        let user = await User.findOne({
            where: { 
                firstname, 
                lastname,
                deleted_at: null
            }
        });

        if (!user) {
            // Create new user if not found
            user = await User.create({
                firstname,
                lastname,
                relationship_type_id,
                created_at: currentTime,
                updated_at: currentTime
            }, { transaction });
        } else {
            // Update existing user's timestamps
            await user.update({
                relationship_type_id,
                updated_at: currentTime
            }, { transaction });
        }

        // Create comment with synchronized timestamps
        const newComment = await Comment.create({
            user_id: user.id,
            category_id,
            comment,
            created_at: currentTime,
            updated_at: currentTime
        }, { transaction });

        // Fetch the complete comment with associations
        const completeComment = await Comment.findByPk(newComment.id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    include: [{
                        model: RelationshipType,
                        as: 'relationship_type'
                    }]
                },
                {
                    model: Category,
                    as: 'category'
                }
            ],
            transaction
        });

        await transaction.commit();
        res.status(201).json(completeComment);
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

const updateComment = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
        const { id } = req.params;
        const { firstname, lastname, relationship_type_id, category_id, comment } = req.body;
        const currentTime = new Date();

        const commentToUpdate = await Comment.findByPk(id);
        if (!commentToUpdate) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Update user with synchronized timestamp
        await User.update(
            { 
                firstname, 
                lastname, 
                relationship_type_id,
                updated_at: currentTime
            },
            { 
                where: { id: commentToUpdate.user_id },
                transaction
            }
        );

        // Update comment with synchronized timestamp
        await commentToUpdate.update({
            category_id,
            comment,
            updated_at: currentTime
        }, { transaction });

        // Fetch updated comment with associations
        const updatedComment = await Comment.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    include: [{
                        model: RelationshipType,
                        as: 'relationship_type'
                    }]
                },
                {
                    model: Category,
                    as: 'category'
                }
            ],
            transaction
        });

        await transaction.commit();
        res.json(updatedComment);
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

const deleteComment = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
        const { id } = req.params;
        const currentTime = new Date();

        // First find the comment with its associated user
        const comment = await Comment.findByPk(id, {
            include: [{ model: User, as: 'user' }]
        });

        if (!comment) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if this is the user's last comment
        const userCommentCount = await Comment.count({
            where: {
                user_id: comment.user_id,
                deleted_at: null,
                id: { [db.Sequelize.Op.ne]: id } // Exclude current comment
            }
        });

        // Soft delete the comment
        await comment.update({
            deleted_at: currentTime,
            updated_at: currentTime
        }, { transaction });

        // If this was the user's last comment, soft delete the user too
        if (userCommentCount === 0) {
            await User.update({
                deleted_at: currentTime,
                updated_at: currentTime
            }, {
                where: { id: comment.user_id },
                transaction
            });
        }

        await transaction.commit();
        
        // Fetch the final state after deletion
        const deletedData = await Comment.findOne({
            where: { id },
            paranoid: false,
            include: [{
                model: User,
                as: 'user',
                paranoid: false
            }]
        });

        res.json({ 
            message: 'Comment deleted successfully',
            data: deletedData
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

export default {
    getAllComments,
    createComment,
    updateComment,
    deleteComment
}; 