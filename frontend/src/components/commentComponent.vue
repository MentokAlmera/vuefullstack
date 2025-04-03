<template>
    <navComponent />
    <main class="container bg-white p-4 rounded shadow-lg mt-5">
        <h1 class="text-center text-danger mt-3 mb-4">Comments</h1>

        <!-- Add Comment Form - Now static -->
        <div class="sticky-form bg-white p-4 shadow-sm rounded">
            <form @submit.prevent="saveComment" class="row g-3">
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
                    <textarea v-model="commentText" class="form-control" rows="3" required></textarea>
                </div>
                <div class="col-md-5">
                    <label class="form-label fw-bold">Relationship</label>
                    <select v-model="relationship" class="form-select">
                        <option value="">Select Relationship</option>
                        <option v-for="rel in relationships" :key="rel" :value="rel">
                            {{ rel.charAt(0).toUpperCase() + rel.slice(1) }}
                        </option>
                    </select>
                </div>
                <div class="col-md-5" v-if="relationship">
                    <label class="form-label fw-bold">{{ relationshipQuestion }}</label>
                    <!-- Family dropdown -->
                    <select v-if="relationship === 'family'" v-model="relationshipDetail" class="form-select" required>
                        <option value="">Select Family Type</option>
                        <option v-for="type in familyTypes" :key="type" :value="type">
                            {{ type.charAt(0).toUpperCase() + type.slice(1) }}
                        </option>
                    </select>
                    <!-- Friend dropdown -->
                    <select v-else-if="relationship === 'friend'" v-model="relationshipDetail" class="form-select" required>
                        <option value="">Select When Met</option>
                        <option v-for="category in friendCategories" :key="category" :value="category">
                            {{ category.toUpperCase() }}
                        </option>
                    </select>
                    <!-- Stranger dropdown -->
                    <select v-else-if="relationship === 'stranger'" v-model="relationshipDetail" class="form-select" required>
                        <option value="">Select Platform</option>
                        <option v-for="platform in socialPlatforms" :key="platform" :value="platform">
                            {{ platform.charAt(0).toUpperCase() + platform.slice(1) }}
                        </option>
                    </select>
                </div>
                <div class="col-md-2 d-flex align-items-end">
                    <button type="submit" class="btn w-100 bg-danger text-light">
                        {{ isEditing ? "Update" : "Add Comment" }}
                    </button>
                </div>
            </form>
        </div>

        <!-- Sort and Filter Controls -->
        <div class="row mt-4 mb-3">
            <div class="col-md-12">
                <div class="input-group">
                    <span class="input-group-text bg-light">
                        <i class="bi bi-funnel"></i> Filter
                    </span>
                    <select v-model="sortBy" class="form-select" @change="sortComments">
                        <option value="all">All Comments</option>
                        <option value="family">Family Only</option>
                        <option value="friend">Friends Only</option>
                        <option value="stranger">Strangers Only</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Comment List -->
        <div class="comments-container">
            <ul class="list-group">
                <li v-for="comment in paginatedComments" :key="comment.id" class="list-group-item comment-item">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6 class="fw-bold text-brown mb-1">
                                {{ comment.firstName }} {{ comment.lastName }}
                            </h6>
                            <p class="mb-2">{{ comment.comment }}</p>
                            <p class="text-muted small mb-0" v-if="comment.relationship">
                                <i class="bi bi-person-badge"></i>
                                <strong>Relationship:</strong> {{ comment.relationship }}
                                <span v-if="getRelationshipDetail(comment)">
                                    ({{ getRelationshipDetail(comment) }})
                                </span>
                            </p>
                        </div>
                        <div class="comment-actions">
                            <button class="btn btn-warning btn-sm me-2" @click="editComment(comment)">
                                <i class="bi bi-pencil"></i> Edit
                            </button>
                            <button class="btn btn-danger btn-sm" @click="deleteComment(comment.id)">
                                <i class="bi bi-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </li>
                <li v-if="filteredComments.length === 0" class="list-group-item text-center py-4">
                    <i class="bi bi-chat-square-text text-muted" style="font-size: 2rem;"></i>
                    <p class="text-muted mt-2 mb-0">No comments available</p>
                </li>
            </ul>
        </div>

        <!-- Pagination -->
        <div class="d-flex align-items-center justify-content-between mt-4">
            <div class="d-flex align-items-center">
                <span class="me-2">Items per page:</span>
                <select v-model="itemsPerPage" class="form-select form-select-sm" style="width: 70px;" @change="currentPage = 1">
                    <option :value="5">5</option>
                    <option :value="10">10</option>
                </select>
            </div>
            <div class="d-flex align-items-center">
                <span class="me-3">1-{{ Math.min(itemsPerPage, filteredComments.length) }} of {{ filteredComments.length }}</span>
                <button class="btn btn-link text-decoration-none px-2" 
                        :disabled="currentPage === 1"
                        @click="currentPage--">
                    <
                </button>
                <button class="btn btn-link text-decoration-none px-2" 
                        :disabled="currentPage === totalPages"
                        @click="currentPage++">
                    >
                </button>
            </div>
        </div>

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
                            <div class="mb-3">
                                <label class="form-label">Relationship</label>
                                <select v-model="relationship" class="form-select">
                                    <option value="">Select Relationship</option>
                                    <option v-for="rel in relationships" :key="rel" :value="rel">
                                        {{ rel.charAt(0).toUpperCase() + rel.slice(1) }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-3" v-if="relationship">
                                <label class="form-label">{{ relationshipQuestion }}</label>
                                <!-- Family dropdown -->
                                <select v-if="relationship === 'family'" v-model="relationshipDetail" class="form-select" required>
                                    <option value="">Select Family Type</option>
                                    <option v-for="type in familyTypes" :key="type" :value="type">
                                        {{ type.charAt(0).toUpperCase() + type.slice(1) }}
                                    </option>
                                </select>
                                <!-- Friend dropdown -->
                                <select v-else-if="relationship === 'friend'" v-model="relationshipDetail" class="form-select" required>
                                    <option value="">Select When Met</option>
                                    <option v-for="category in friendCategories" :key="category" :value="category">
                                        {{ category.toUpperCase() }}
                                    </option>
                                </select>
                                <!-- Stranger dropdown -->
                                <select v-else-if="relationship === 'stranger'" v-model="relationshipDetail" class="form-select" required>
                                    <option value="">Select Platform</option>
                                    <option v-for="platform in socialPlatforms" :key="platform" :value="platform">
                                        {{ platform.charAt(0).toUpperCase() + platform.slice(1) }}
                                    </option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div class="modal fade" id="deleteCommentModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirm Delete</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete this comment? This action cannot be undone.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" @click="confirmDelete">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import { Modal } from "bootstrap";
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
            relationship: "",
            relationshipDetail: "",
            isEditing: false,
            editId: null,
            editModal: null,
            error: "",
            currentPage: 1,
            itemsPerPage: 5,
            sortBy: "all",
            maxDisplayedPages: 5,
            relationships: [],
            friendCategories: [],
            familyTypes: [],
            socialPlatforms: [],
            deleteModal: null,
            commentToDelete: null,
        };
    },
    computed: {
        relationshipQuestion() {
            switch (this.relationship) {
                case 'friend':
                    return 'Category:';
                case 'family':
                    return 'Relation Type:';
                case 'stranger':
                    return 'Found Alme on:';
                default:
                    return '';
            }
        },
        filteredComments() {
            if (this.sortBy === 'all') {
                return this.user_comments;
            }
            return this.user_comments.filter(comment => comment.relationship === this.sortBy);
        },
        totalPages() {
            return Math.ceil(this.filteredComments.length / this.itemsPerPage);
        },
        paginatedComments() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredComments.slice(start, end);
        },
        paginationInfo() {
            const start = (this.currentPage - 1) * this.itemsPerPage + 1;
            const end = Math.min(start + this.itemsPerPage - 1, this.filteredComments.length);
            return { start, end };
        },
        displayedPages() {
            const total = this.totalPages;
            const current = this.currentPage;
            const max = this.maxDisplayedPages;
            
            if (total <= max) {
                return Array.from({ length: total }, (_, i) => i + 1);
            }
            
            let start = Math.max(1, current - Math.floor(max / 2));
            let end = Math.min(total, start + max - 1);
            
            if (end - start + 1 < max) {
                start = Math.max(1, end - max + 1);
            }
            
            return Array.from(
                { length: end - start + 1 },
                (_, i) => start + i
            );
        }
    },
    created() {
        this.getComments();
        this.fetchOptions();
    },
    mounted() {
        const modalElement = document.getElementById("editCommentModal");
        if (modalElement) {
            this.editModal = new Modal(modalElement);
        }
        this.deleteModal = new Modal(document.getElementById('deleteCommentModal'));
    },
    methods: {
        async fetchOptions() {
            try {
                const response = await axios.get("http://localhost:5000/options");
                const options = response.data;
                this.relationships = options.relationships;
                this.friendCategories = options.friendCategories;
                this.familyTypes = options.familyTypes;
                this.socialPlatforms = options.socialPlatforms;
            } catch (err) {
                console.error("Error fetching options:", err);
            }
        },
        getRelationshipDetail(comment) {
            if (!comment.relationship) return null;
            
            if (comment.friends && comment.friends.length > 0) {
                return `Met in: ${comment.friends[0].metOn}`;
            }
            if (comment.family && comment.family.length > 0) {
                return `Relationship type: ${comment.family[0].relationshipType}`;
            }
            if (comment.strangers && comment.strangers.length > 0) {
                return `Found on: ${comment.strangers[0].foundOn}`;
            }
            return null;
        },
        async getComments() {
            try {
                const response = await axios.get("http://localhost:5000/user_comment");
                // Sort comments by newest first (assuming there's a timestamp field)
                this.user_comments = response.data.sort((a, b) => {
                    return new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt);
                });
            } catch (err) {
                console.error("Error fetching comments:", err);
                this.error = err.response?.data?.message || 
                            err.response?.data?.error || 
                            "Failed to fetch comments. Please try again later.";
                this.user_comments = [];
            }
        },
        async saveComment() {
            try {
                const commentData = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    comment: this.commentText,
                    relationship: this.relationship,
                    relationshipDetail: this.relationshipDetail
                };

                if (this.isEditing) {
                    await axios.put(`http://localhost:5000/user_comment/${this.editId}`, commentData);
                } else {
                    await axios.post("http://localhost:5000/user_comment", commentData);
                }
                this.cancelEdit();
                this.getComments();
                if (this.editModal) this.editModal.hide();
            } catch (err) {
                console.error("Error saving comment:", err);
            }
        },
        editComment(comment) {
            this.firstName = comment.firstName;
            this.lastName = comment.lastName;
            this.commentText = comment.comment;
            this.relationship = comment.relationship;
            
            // Set relationshipDetail based on the relationship type
            if (comment.friends && comment.friends.length > 0) {
                this.relationshipDetail = comment.friends[0].metOn;
            } else if (comment.family && comment.family.length > 0) {
                this.relationshipDetail = comment.family[0].relationshipType;
            } else if (comment.strangers && comment.strangers.length > 0) {
                this.relationshipDetail = comment.strangers[0].foundOn;
            } else {
                this.relationshipDetail = '';
            }
            
            this.editId = comment.id;
            this.isEditing = true;
            if (this.editModal) this.editModal.show();
        },
        cancelEdit() {
            this.firstName = "";
            this.lastName = "";
            this.commentText = "";
            this.relationship = "";
            this.relationshipDetail = "";
            this.isEditing = false;
            this.editId = null;
        },
        deleteComment(id) {
            this.commentToDelete = id;
            this.deleteModal.show();
        },
        async confirmDelete() {
            try {
                await axios.delete(`http://localhost:5000/user_comment/${this.commentToDelete}`);
                this.user_comments = this.user_comments.filter(comment => comment.id !== this.commentToDelete);
                this.deleteModal.hide();
                this.commentToDelete = null;
            } catch (error) {
                console.error('Error deleting comment:', error);
                this.error = 'Failed to delete comment';
            }
        },
        sortComments() {
            this.currentPage = 1; // Reset to first page when sorting changes
        },
    },
};
</script>

<style scoped>
.text-brown {
    color: #8b4513;
}

.sticky-form {
    position: sticky;
    top: 20px;
    z-index: 1000;
    border-radius: 8px;
    transition: box-shadow 0.3s ease;
}

.sticky-form:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.comments-container {
    max-height: 600px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #dc3545 #f8f9fa;
}

.comments-container::-webkit-scrollbar {
    width: 8px;
}

.comments-container::-webkit-scrollbar-track {
    background: #f8f9fa;
    border-radius: 4px;
}

.comments-container::-webkit-scrollbar-thumb {
    background-color: #dc3545;
    border-radius: 4px;
}

.comment-item {
    border-radius: 8px;
    margin-bottom: 1rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.comment-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.comment-actions {
    opacity: 0.7;
    transition: opacity 0.2s ease;
}

.comment-item:hover .comment-actions {
    opacity: 1;
}

/* Pagination styles */
.btn-link {
    color: #000;
    font-size: 1.2rem;
    padding: 0.25rem 0.5rem;
}

.btn-link:hover:not(:disabled) {
    color: #000;
    background-color: #f0f0f0;
}

.btn-link:disabled {
    color: #ccc;
    opacity: 1;
}

.form-select-sm {
    padding: 0.25rem 1.5rem 0.25rem 0.5rem;
    font-size: 0.875rem;
    border-radius: 4px;
    border-color: #ced4da;
}

.form-select-sm:focus {
    border-color: #ced4da;
    box-shadow: none;
}

.input-group-text {
    border: none;
    background-color: #f8f9fa;
}

.form-select {
    border-radius: 4px;
}

.form-select:focus {
    border-color: #ced4da;
}

.btn-outline-secondary {
    border-color: #ced4da;
}

.btn-outline-secondary:hover:not(:disabled) {
    background-color: #f8f9fa;
    border-color: #ced4da;
    color: #212529;
}

.btn-outline-secondary:disabled {
    opacity: 0.4;
}

.form-control:focus, .form-select:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

.btn {
    transition: all 0.2s ease;
}

.btn:hover {
    transform: translateY(-1px);
}

.btn-warning {
    background-color: #ffc107;
    border-color: #ffc107;
    color: #000;
}

.btn-warning:hover {
    background-color: #ffca2c;
    border-color: #ffc720;
    color: #000;
}

.btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
}

.btn-danger:hover {
    background-color: #bb2d3b;
    border-color: #b02a37;
}
</style>