<template>
    <navComponent />
    <div class="container bg-white p-5 rounded shadow-lg text-center mt-5">
        <h1 class="text-danger">Projects</h1>
        <section class="my-4">
            <div class="container">
                <div class="row justify-content-center g-4">
                    <div class="col-12 col-md-6 col-lg-3 d-flex justify-content-center"
                        v-for="(project, index) in projects" :key="index">
                        <a :href="project.link" target="_blank" rel="noopener noreferrer"
                            class="text-decoration-none text-dark">
                            <div class="card">
                                <img :src="project.image" class="card-img-top mt-2" :alt="project.title + ' Logo'" />
                                <div class="card-body">
                                    <h5 class="card-title text-warning">{{ project.title }}</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">{{ project.role }}</h6>
                                    <p class="card-text">{{ project.description }}</p>
                                </div>
                            </div>
                        </a>
                    </div>
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
            projects: [
                {
                    title: "Orgbee",
                    role: "Developer & QA",
                    description: "A centralized platform for student organizations, offering seamless registration, event management, and a freedom wall for student engagement.",
                    image: require('@/assets/orgbee.png'),
                    link: "https://youtu.be/VCBvzY_kwdk"
                },
                {
                    title: "QuotLab & ISync",
                    role: "Developer & DA",
                    description: "A digital quotation and calibration documentation platform streamlining processes for DOST-ITDI and reducing paper-based workflows.",
                    image: require('@/assets/logoquotlab.png'),
                    link: "https://youtu.be/KszPsXuNJzk"
                },
                {
                    title: "HypeHive",
                    role: "Developer",
                    description: "HypeHive is an interactive social platform linked with Likha and Postify, designed to connect communities through photo sharing and status updates.",
                    image: require('@/assets/hypehive.png'),
                    link: "###"
                },
                {
                    title: "Don't Touch My Egg",
                    role: "Asset Maker",
                    description: "A fast-paced arcade game where you control a mother duck on a mission to protect her eggs from various threats in a thrilling and challenging environment.",
                    image: require('@/assets/dtmg.png'),
                    link: "https://youtu.be/n114zmKna_8"
                }
            ]
        };
    }
};
</script>

<style scoped>

</style>