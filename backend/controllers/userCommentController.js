import db from '../models/index.js'; // Import the default export
const { User } = db; // Destructure the User model

const getAllComments = async (req, res) => {
    try {
        const users = await User.findAll({ where: { deleted_at: null } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Database query failed" });
    }
};

const addComment = async (req, res) => {
    try {
        const { firstName, lastName, comment } = req.body;
        if (!firstName || !lastName || !comment) {
            return res.status(400).json({ error: "All fields are required" });
        }
        await User.create({ firstName, lastName, comment });
        res.json({ message: "Comment added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add comment" });
    }
};

const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, comment } = req.body;
        if (!firstName || !lastName || !comment) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const [updated] = await User.update({ firstName, lastName, comment }, { where: { id } });
        if (!updated) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json({ message: "Comment updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update comment" });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await User.update({ deleted_at: new Date() }, { where: { id } });
        if (!updated) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json({ message: "Comment soft-deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
};

export default { getAllComments, addComment, updateComment, deleteComment };
