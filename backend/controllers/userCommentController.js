import db from '../models/index.js'; // Import the default export
const { User, RelationshipType, Category, Comment } = db; // Destructure the User model

const getAllComments = async (req, res, next) => {
    try {
        console.log('Fetching all comments...');
        const users = await User.findAll({ 
            where: { deleted_at: null },
            include: [
                { 
                    model: RelationshipType,
                    as: 'relationship_type',
                    include: [
                        {
                            model: Category,
                            as: 'categories',
                            include: [
                                {
                                    model: Comment,
                                    as: 'comments',
                                    where: { deleted_at: null },
                                    required: false,
                                    include: [
                                        {
                                            model: User,
                                            as: 'user'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            order: [['created_at', 'DESC']]
        });
        console.log(`Found ${users.length} users with comments`);
        res.json(users);
    } catch (error) {
        console.error('Error in getAllComments:', error);
        next(error); // Pass error to Express error handler
    }
};

const addComment = async (req, res) => {
    try {
        const { firstname, lastname, relationship_type_id, category_id, comment } = req.body;
        if (!firstname || !lastname || !relationship_type_id || !category_id || !comment) {
            return res.status(400).json({ error: "All fields are required" });
        }
        
        const transaction = await db.sequelize.transaction();
        
        try {
            const currentTime = new Date();

            // Create the user with specific timestamp
            const user = await User.create({ 
                firstname, 
                lastname, 
                relationship_type_id,
                created_at: currentTime,
                updated_at: currentTime
            }, { transaction });
            
            // Create the comment with the same timestamps
            const newComment = await Comment.create({
                user_id: user.id,
                category_id,
                comment,
                created_at: currentTime,
                updated_at: currentTime
            }, { transaction });

            await transaction.commit();
            
            res.json({ 
                message: "Comment added successfully", 
                user: user.toJSON(), 
                comment: newComment.toJSON() 
            });
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Failed to add comment" });
    }
};

const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, relationship_type_id, category_id, comment } = req.body;
        if (!firstname || !lastname || !relationship_type_id || !category_id || !comment) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const transaction = await db.sequelize.transaction();
        
        try {
            const user = await User.findByPk(id);
            if (!user) {
                await transaction.rollback();
                return res.status(404).json({ error: "User not found" });
            }

            const currentTime = new Date();

            // Update user with specific timestamp
            await user.update({ 
                firstname, 
                lastname, 
                relationship_type_id,
                updated_at: currentTime
            }, { transaction });

            // Update or create comment with the same timestamp
            const existingComment = await Comment.findOne({
                where: { 
                    user_id: id, 
                    category_id,
                    deleted_at: null
                }
            });

            if (existingComment) {
                await existingComment.update({ 
                    comment,
                    updated_at: currentTime
                }, { transaction });
            } else {
                await Comment.create({
                    user_id: id,
                    category_id,
                    comment,
                    created_at: currentTime,
                    updated_at: currentTime
                }, { transaction });
            }

            await transaction.commit();

            // Fetch updated data
            const updatedUser = await User.findByPk(id, {
                include: [{
                    model: Comment,
                    as: 'comments',
                    where: { category_id },
                    required: false
                }]
            });

            res.json({ 
                message: "Comment updated successfully", 
                user: updatedUser.toJSON()
            });
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Failed to update comment" });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        
        const transaction = await db.sequelize.transaction();
        
        try {
            // Find the user
            const user = await User.findByPk(id);
            if (!user) {
                await transaction.rollback();
                return res.status(404).json({ error: "User not found" });
            }

            // Find all related comments before deletion
            const comments = await Comment.findAll({
                where: { user_id: id }
            });

            // Get current timestamp for consistent time across all operations
            const currentTime = new Date();

            // Soft delete the user with specific timestamp
            await User.update(
                { 
                    deleted_at: currentTime,
                    updated_at: currentTime
                },
                { 
                    where: { id },
                    transaction
                }
            );

            // Soft delete related comments with the same timestamps
            if (comments.length > 0) {
                await Comment.update(
                    { 
                        deleted_at: currentTime,
                        updated_at: currentTime
                    },
                    {
                        where: { user_id: id },
                        transaction
                    }
                );
            }

            await transaction.commit();

            // After transaction is committed, fetch the deleted user and comments
            const deletedUser = await User.findOne({
                where: { id },
                paranoid: false,
                attributes: ['id', 'firstname', 'lastname', 'created_at', 'updated_at', 'deleted_at']
            });

            const deletedComments = await Comment.findAll({
                where: { user_id: id },
                paranoid: false,
                attributes: ['id', 'comment', 'created_at', 'updated_at', 'deleted_at']
            });

            // Log for debugging
            console.log('Deleted user:', deletedUser.toJSON());
            console.log('Deleted comments:', deletedComments.map(c => c.toJSON()));

            res.json({ 
                message: "User and related comments soft-deleted successfully",
                user: deletedUser.toJSON(),
                comments: deletedComments.map(c => c.toJSON()),
                timestamp: currentTime
            });
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Failed to delete user and comments" });
    }
};

export default { getAllComments, addComment, updateComment, deleteComment };
