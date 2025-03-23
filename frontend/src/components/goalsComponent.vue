<template>
    <navComponent />
    <div class="container bg-white p-4 rounded shadow-lg text-center mt-5">
        <h1 class="text-center text-danger">Goals</h1>

        <section class="d-flex justify-content-center align-items-center my-4">
            <div class="container">
                <div class="row justify-content-center">
                    <template v-if="goals.length > 0">
                        <div v-for="(goal, index) in goals" :key="index" class="card col-lg-2 m-2">
                            <img v-if="goal.img" :src="goal.img" class="card-img-top img-fluid mx-auto d-block"
                                alt="Goal Image" width="50" />
                            <div class="card-body">
                                <h5 class="card-title text-center fw-bold">{{ goal.text }}</h5>
                                <p class="card-text text-center">{{ goal.description }}</p>
                            </div>
                        </div>
                    </template>
                    <p v-else class="text-center">NO DATA AVAILABLE</p>
                </div>
            </div>
        </section>
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
            goals: [
                { img: require('@/assets/diploma.png'), text: "Graduate", description: "Achieve my academic goals and earn my diploma." },
                { img: require('@/assets/dev.png'), text: "Become a Full Stack Developer", description: "Master front-end and back-end technologies to build complete applications." },
                { img: require('@/assets/improve.png'), text: "Improve Myself", description: "Continuously grow personally and professionally to become a better version of myself." },
                { img: require('@/assets/lifebalance.png'), text: "Work in a Healthy Environment", description: "Find a workplace that supports well-being, collaboration, and work-life balance." }
            ]

        };
    }
};
</script>

<style scoped>

</style>
