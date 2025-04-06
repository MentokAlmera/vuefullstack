<template>
    <!-- Loading Overlay -->
    <div v-if="isLoading" class="loading-overlay">
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
        <div class="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this comment? This action cannot be undone.</p>
            <div class="modal-buttons">
                <button @click="confirmDelete" class="btn btn-danger">Delete</button>
                <button @click="cancelDelete" class="btn btn-secondary">Cancel</button>
            </div>
        </div>
    </div>

    <navComponent />
    <main class="container bg-white p-4 rounded shadow-lg mt-5">
        <h1 class="text-center text-danger mt-3 mb-4">Comments</h1>

        <!-- Add this after the navComponent -->
        <div v-if="showErrorAlert" class="alert alert-danger alert-dismissible fade show mx-4 mt-4" role="alert">
            <strong>Error!</strong> {{ errorMessage }}
            <button type="button" class="btn-close" @click="showErrorAlert = false"></button>
        </div>

        <!-- Add Comment Form -->
        <div class="sticky-form bg-white p-4 shadow-sm rounded">
            <form @submit.prevent="saveComment" class="row g-3">
                <div class="col-md-5">
                    <label class="form-label fw-bold">First Name</label>
                    <input 
                        v-model="firstName" 
                        type="text" 
                        class="form-control" 
                        :class="{ 'is-invalid': touchedFields.firstName && !isValidFirstName }"
                        @blur="touchField('firstName')"
                        required 
                    />
                    <div class="invalid-feedback" v-if="touchedFields.firstName && !isValidFirstName">
                        First name must be between 2 and 50 characters
                    </div>
                </div>
                <div class="col-md-5">
                    <label class="form-label fw-bold">Last Name</label>
                    <input 
                        v-model="lastName" 
                        type="text" 
                        class="form-control" 
                        :class="{ 'is-invalid': touchedFields.lastName && !isValidLastName }"
                        @blur="touchField('lastName')"
                        required 
                    />
                    <div class="invalid-feedback" v-if="touchedFields.lastName && !isValidLastName">
                        Last name must be between 2 and 50 characters
                    </div>
                </div>
                <div class="col-md-10">
                    <label class="form-label fw-bold">Comment</label>
                    <textarea 
                        v-model="commentText" 
                        class="form-control" 
                        :class="{ 'is-invalid': touchedFields.comment && !isValidComment }"
                        @blur="touchField('comment')"
                        rows="3" 
                        required
                    ></textarea>
                    <div class="invalid-feedback" v-if="touchedFields.comment && !isValidComment">
                        Comment must be between 3 and 1000 characters
                    </div>
                </div>
                <div class="col-md-5">
                    <label class="form-label fw-bold">Relationship</label>
                    <select 
                        v-model="selectedRelationshipType" 
                        class="form-select"
                        :class="{ 'is-invalid': touchedFields.relationshipType && !isValidRelationshipType }"
                        @blur="touchField('relationshipType')"
                        @change="loadCategories"
                        required
                    >
                        <option value="">Select Relationship</option>
                        <option v-for="type in relationshipTypes" :key="type.id" :value="type">
                            {{ type.dropdown_label }}
                        </option>
                    </select>
                    <div class="invalid-feedback" v-if="touchedFields.relationshipType && !isValidRelationshipType">
                        Please select a relationship type
                    </div>
                </div>
                <div class="col-md-5" v-if="selectedRelationshipType">
                    <label class="form-label fw-bold">Category</label>
                    <select 
                        v-model="selectedCategory" 
                        class="form-select"
                        :class="{ 'is-invalid': touchedFields.category && !isValidCategory }"
                        @blur="touchField('category')"
                        required
                    >
                        <option value="">Select Category</option>
                        <option v-for="category in categories" :key="category.id" :value="category">
                            {{ category.label }}
                        </option>
                    </select>
                    <div class="invalid-feedback" v-if="touchedFields.category && !isValidCategory">
                        Please select a category
                    </div>
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
                        <option v-for="type in relationshipTypes" :key="type.id" :value="type.id">
                            {{ type.dropdown_label }} Only
                        </option>
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
                                {{ comment.user.firstname }} {{ comment.user.lastname }}
                            </h6>
                            <p class="mb-2">{{ comment.comment }}</p>
                            <p class="text-muted small mb-0">
                                <i class="bi bi-person-badge"></i>
                                <strong>Relationship:</strong> {{ comment.user.relationship_type.dropdown_label }}
                                <span v-if="comment.category">
                                    ({{ comment.category.label }})
                                </span>
                            </p>
                        </div>
                        <div class="comment-actions">
                            <button class="btn btn-warning btn-sm me-2" @click="editComment(comment)">
                                <i class="bi bi-pencil"></i> Edit
                            </button>
                            <button class="btn btn-danger btn-sm" @click="deleteComment(comment)">
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
                <span class="me-3">{{ paginationText }}</span>
                <button class="btn btn-link text-decoration-none px-2" 
                        :disabled="currentPage === 1"
                        @click="currentPage--">
                    <i class="bi bi-chevron-left"></i>
                </button>
                <button class="btn btn-link text-decoration-none px-2" 
                        :disabled="currentPage === totalPages"
                        @click="currentPage++">
                    <i class="bi bi-chevron-right"></i>
                </button>
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import navComponent from "./navComponent.vue";
import { commentAPI, relationshipAPI, categoryAPI } from '../services/api';

export default {
    components: {
        navComponent,
    },
    data() {
        return {
            comments: [],
            firstName: "",
            lastName: "",
            commentText: "",
            selectedRelationshipType: null,
            selectedCategory: null,
            relationshipTypes: [],
            categories: [],
            isEditing: false,
            editId: null,
            currentPage: 1,
            itemsPerPage: 5,
            sortBy: "all",
            isLoading: false,
            showDeleteModal: false,
            commentToDelete: null,
            validationErrors: {},
            showErrorAlert: false,
            errorMessage: "",
            touchedFields: {
                firstName: false,
                lastName: false,
                relationshipType: false,
                category: false,
                comment: false
            }
        };
    },
    computed: {
        filteredComments() {
            if (this.sortBy === "all") return this.comments;
            return this.comments.filter(comment => 
                comment.user.relationship_type_id === this.sortBy
            );
        },
        paginatedComments() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredComments.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredComments.length / this.itemsPerPage);
        },
        paginationText() {
            const start = (this.currentPage - 1) * this.itemsPerPage + 1;
            const end = Math.min(start + this.itemsPerPage - 1, this.filteredComments.length);
            return `${start}-${end} of ${this.filteredComments.length}`;
        },
        isValidFirstName() {
            return this.firstName.length >= 2 && this.firstName.length <= 50;
        },
        isValidLastName() {
            return this.lastName.length >= 2 && this.lastName.length <= 50;
        },
        isValidComment() {
            return this.commentText.length >= 3 && this.commentText.length <= 1000;
        },
        isValidRelationshipType() {
            return this.selectedRelationshipType !== null;
        },
        isValidCategory() {
            return this.selectedCategory !== null;
        },
        isFormValid() {
            return this.isValidFirstName && 
                   this.isValidLastName && 
                   this.isValidComment && 
                   this.isValidRelationshipType && 
                   this.isValidCategory;
        }
    },
    async created() {
        await this.loadRelationshipTypes();
        await this.fetchComments();
    },
    methods: {
        async loadRelationshipTypes() {
            try {
                const response = await relationshipAPI.getAll();
                this.relationshipTypes = response.data;
            } catch (error) {
                console.error('Error fetching relationship types:', error);
                this.errorMessage = "Error loading relationship types. Please try again.";
                this.showErrorAlert = true;
            }
        },
        async fetchComments() {
            try {
                this.isLoading = true;
                const response = await commentAPI.getAll();
                this.comments = response.data;
            } catch (error) {
                console.error('Error fetching comments:', error);
                this.errorMessage = "Error loading comments. Please try again.";
                this.showErrorAlert = true;
            } finally {
                this.isLoading = false;
            }
        },
        async loadCategories() {
            if (!this.selectedRelationshipType) {
                this.categories = [];
                this.selectedCategory = null;
                return;
            }

            try {
                this.isLoading = true;
                const response = await categoryAPI.getByRelationship(this.selectedRelationshipType.id);
                this.categories = response.data;
                this.selectedCategory = null;
            } catch (error) {
                console.error('Error fetching categories:', error.response || error);
                this.errorMessage = "Error loading categories. Please try again.";
                this.showErrorAlert = true;
                this.categories = [];
            } finally {
                this.isLoading = false;
            }
        },
        async saveComment() {
            // Mark all fields as touched when submitting
            Object.keys(this.touchedFields).forEach(field => {
                this.touchedFields[field] = true;
            });

            // Check if form is valid before submitting
            if (!this.isFormValid) {
                this.showErrorAlert = true;
                this.errorMessage = "Please fix the validation errors before submitting.";
                return;
            }

            try {
                this.isLoading = true;
                this.validationErrors = {};
                this.showErrorAlert = false;

                const commentData = {
                    firstname: this.firstName,
                    lastname: this.lastName,
                    relationship_type_id: this.selectedRelationshipType?.id,
                    category_id: this.selectedCategory?.id,
                    comment: this.commentText
                };

                if (this.isEditing) {
                    await commentAPI.update(this.editId, commentData);
                } else {
                    await commentAPI.create(commentData);
                }

                await this.fetchComments();
                this.resetForm();
            } catch (error) {
                if (error.response?.data?.errors) {
                    const errors = {};
                    error.response.data.errors.forEach(err => {
                        errors[err.path] = err.msg;
                    });
                    this.validationErrors = errors;
                    this.errorMessage = "Please fix the validation errors.";
                    this.showErrorAlert = true;
                } else {
                    this.errorMessage = "An error occurred while saving the comment.";
                    this.showErrorAlert = true;
                }
                console.error('Error saving comment:', error);
            } finally {
                this.isLoading = false;
            }
        },
        deleteComment(comment) {
            this.commentToDelete = comment;
            this.showDeleteModal = true;
        },
        editComment(comment) {
            this.firstName = comment.user.firstname;
            this.lastName = comment.user.lastname;
            this.commentText = comment.comment;
            this.selectedRelationshipType = comment.user.relationship_type;
            this.loadCategories().then(() => {
                this.selectedCategory = comment.category;
            });
            this.isEditing = true;
            this.editId = comment.id;
        },
        resetForm() {
            this.firstName = "";
            this.lastName = "";
            this.commentText = "";
            this.selectedRelationshipType = null;
            this.selectedCategory = null;
            this.isEditing = false;
            this.editId = null;
            this.categories = [];
            this.validationErrors = {};
            this.showErrorAlert = false;
            this.touchedFields = {
                firstName: false,
                lastName: false,
                relationshipType: false,
                category: false,
                comment: false
            };
        },
        sortComments() {
            this.currentPage = 1;
        },
        async confirmDelete() {
            if (!this.commentToDelete) return;

            try {
                this.isLoading = true;
                await commentAPI.delete(this.commentToDelete.id);
                await this.fetchComments();
            } catch (error) {
                console.error('Error deleting comment:', error);
                this.errorMessage = "Error deleting comment. Please try again.";
                this.showErrorAlert = true;
            } finally {
                this.isLoading = false;
                this.showDeleteModal = false;
                this.commentToDelete = null;
            }
        },
        cancelDelete() {
            this.showDeleteModal = false;
            this.commentToDelete = null;
        },
        touchField(fieldName) {
            this.touchedFields[fieldName] = true;
        }
    }
};
</script>

<style scoped>
.sticky-form {
    position: sticky;
    top: 0;
    z-index: 1000;
    background-color: white;
    margin-bottom: 2rem;
    border-bottom: 1px solid #dee2e6;
}

.comment-item {
    transition: background-color 0.2s;
}

.comment-item:hover {
    background-color: #f8f9fa;
}

.comment-actions {
    opacity: 0;
    transition: opacity 0.2s;
}

.comment-item:hover .comment-actions {
    opacity: 1;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loading-spinner {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
}

.spinner {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    width: 90%;
    text-align: center;
}

.modal-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
}

.modal-buttons button {
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn:hover {
    opacity: 0.9;
}

.form-control.is-invalid,
.form-select.is-invalid {
    border-color: #dc3545;
    padding-right: calc(1.5em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.form-select.is-invalid {
    padding-right: 4.125rem;
    background-position: right 0.75rem center, center right 2.25rem;
    background-size: 16px 12px, calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.invalid-feedback {
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: #dc3545;
}
</style>