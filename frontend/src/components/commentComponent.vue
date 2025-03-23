<template>
    <navComponent />
    <main class="container bg-white p-4 rounded shadow-lg mt-5">
        <h1 class="text-center text-danger mt-3">Comments</h1>

        <!-- Add Comment Form -->
        <form @submit.prevent="saveComment" class="row g-3 m-4 p-4">
            <div class="col-md-5">
                <label class="form-label fw-bold">First Name</label>
                <input v-model="firstName" type="text" class="form-control" required />
            </div>
            <div class="col-md-5">
                <label class="form-label fw-bold">Last Name</label>
                <input v-model="lastName" type="text" class="form-control" required />
            </div>
            <div class="col-md-10">
                <label class="form-label fw-bold">Comment</label>
                <textarea v-model="commentText" class="form-control" required></textarea>
            </div>
            <div class="col-md-2 d-flex align-items-end">
                <button type="submit" class="btn w-100 bg-danger text-light">
                    {{ isEditing ? "Update" : "Add Comment" }}
                </button>
            </div>
        </form>

        <!-- Comment List -->
        <ul class="list-group m-4 p-4 mt-0 pt-0">
            <li v-for="comment in user_comments" :key="comment.id" class="list-group-item mt-4">
                <h6 class="fw-bold text-brown mb-0">
                    {{ comment.firstName }} {{ comment.lastName }}
                </h6>
                <p class="mb-0">{{ comment.comment }}</p>
                <button class="btn btn-warning btn-sm me-2" @click="editComment(comment)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="deleteComment(comment.id)">Delete</button>
            </li>
            <li v-if="user_comments.length === 0" class="list-group-item text-center">
                NO DATA AVAILABLE
            </li>
        </ul>

        <!-- Edit Comment Modal -->
        <div class="modal fade" id="editCommentModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Comment</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveComment">
                            <div class="mb-3">
                                <label class="form-label">First Name</label>
                                <input v-model="firstName" type="text" class="form-control" required />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Last Name</label>
                                <input v-model="lastName" type="text" class="form-control" required />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Comment</label>
                                <textarea v-model="commentText" class="form-control" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import { Modal } from "bootstrap"; // Import Bootstrap Modal
import navComponent from "./navComponent.vue";

export default {
    components: {
        navComponent,
    },
    data() {
        return {
            user_comments: [],
            firstName: "",
            lastName: "",
            commentText: "",
            isEditing: false,
            editId: null,
            editModal: null, // Store Bootstrap modal instance
        };
    },
    created() {
        this.getComments();
    },
    mounted() {
        // Initialize the modal instance
        const modalElement = document.getElementById("editCommentModal");
        if (modalElement) {
            this.editModal = new Modal(modalElement);
        }
    },
    methods: {
        async getComments() {
            try {
                const response = await axios.get("http://localhost:5000/user_comment");
                this.user_comments = response.data;
            } catch (err) {
                console.error("Error fetching comments:", err);
            }
        },
        async saveComment() {
            try {
                if (this.isEditing) {
                    await axios.put(`http://localhost:5000/user_comment/${this.editId}`, {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        comment: this.commentText,
                    });
                } else {
                    await axios.post("http://localhost:5000/user_comment", {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        comment: this.commentText,
                    });
                }
                this.cancelEdit();
                this.getComments();
                if (this.editModal) this.editModal.hide(); // Close modal after saving
            } catch (err) {
                console.error("Error saving comment:", err);
            }
        },
        editComment(comment) {
            this.firstName = comment.firstName;
            this.lastName = comment.lastName;
            this.commentText = comment.comment;
            this.editId = comment.id;
            this.isEditing = true;
            if (this.editModal) this.editModal.show(); // Show modal
        },
        cancelEdit() {
            this.firstName = "";
            this.lastName = "";
            this.commentText = "";
            this.isEditing = false;
            this.editId = null;
        },
        async deleteComment(id) {
            if (confirm("Are you sure?")) {
                await axios.delete(`http://localhost:5000/user_comment/${id}`);
                this.getComments();
            }
        },
    },
};
</script>

<style scoped>
.text-brown {
    color: #8b4513;
}

.list-group-item {
    border-radius: 8px;
    padding: 15px;
    background: #f8f9fa;
}

.btn-warning,
.btn-danger {
    margin-top: 5px;
}
</style>