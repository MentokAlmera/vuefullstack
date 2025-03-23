<template>
    <navComponent />
    <div class="container bg-white p-5 rounded shadow-lg text-center mt-5">
        <h1 class="text-danger">Interests and Hobbies</h1>

        <div class="accordion" id="hobbiesAccordion">
            <div class="accordion-item" v-for="(hobby, index) in hobbies" :key="index">
                <h2 class="accordion-header" :id="'heading' + index">
                    <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse"
                        :data-bs-target="'#collapse' + index" aria-expanded="false" :aria-controls="'collapse' + index">
                        {{ hobby.title }}
                    </button>
                </h2>
                <div :id="'collapse' + index" class="accordion-collapse collapse" :aria-labelledby="'heading' + index"
                    data-bs-parent="#hobbiesAccordion">
                    <div class="accordion-body">
                        {{ hobby.description }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import navComponent from './navComponent.vue';
export default {
    components: {
        navComponent
    },
    data() {
        return {
            hobbies: [
                { title: "KPOP", description: "Immersing myself in the world of Kpop, enjoying the catchy tunes and mesmerizing choreography." },
                { title: "Fashion", description: "Exploring different styles and trends, expressing my personality through unique outfits and accessories." },
                { title: "Travel", description: "Embarking on exciting journeys to new destinations, creating memories that last a lifetime." },
                { title: "Organizing", description: "Finding joy in tidying up and creating an orderly environment, making life more efficient and enjoyable." },
            ],
        };
    },
};
</script>

<style scoped>

</style>