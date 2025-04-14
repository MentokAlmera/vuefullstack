<template>
    <navComponent />
    <div>
        <p class="name text-align-center p-4 m-4">Gallery</p>
        <div>
            <form>
                <input type="file" accept="image/*" @change="uploadImage" />
                <div>
                    <img v-if="previewImage" :src="previewImage" alt="Image Preview" />
                </div>
                <button>Add</button>
            </form>
        </div>
    </div>
</template>

<script>
import navComponent from './navComponent.vue';
import axios from 'axios';

export default {
    components: {
        navComponent
    },
    data() {
        return {
            galleries: [],
            previewImage: null,
        };
    },

    methods: {
        uploadImage(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                this.previewImage = e.target.result;
                this.uploadToServer(file);
            };
        },
        uploadToServer(file) {
            const formData = new FormData();
            formData.append('file', file);
            axios.post('http://your-server-url/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => {
                console.log('Upload successful:', response.data);
            }).catch(error => {
                console.error('Upload failed:', error);
            });
        },
    },


};
</script>


<style scoped>
img {
    height: auto;
    width: 50%;

}
</style>