<template>
    <navComponent />
    <div class="text-center mt-5">
      <h1 class="name my-4">Projects</h1>
      <section>
        <div class="container">
          <!-- Loop through regular projects -->
          <div
            v-for="(project, index) in regularProjects"
            :key="index"
            class="row align-items-center mb-5 py-4"
            :class="project.title === 'Orgbee' || index % 2 === 0 ? 'alt-bg text-white' : ''"
          >
            <!-- YouTube video -->
            <div class="col-md-6" :class="index % 2 === 0 ? 'order-md-1' : 'order-md-2'">
              <iframe
                class="w-100 ratio ratio-16x9"
                :src="getYoutubeEmbedUrl(project.link)"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
              ></iframe>
            </div>
  
            <!-- Logo, title, description -->
            <div class="col-md-6 text-center d-flex flex-column align-items-center"
                 :class="index % 2 === 0 ? 'order-md-2' : 'order-md-1'">
              <img :src="project.image" class="img-fluid mb-3" style="max-width: 1000px;" :alt="project.title" />
              <h3 class="text-warning">{{ project.title }}</h3>
              <h6 class="text-body-secondary" :class="index % 2 === 1 ? 'text-light' : ''">{{ project.role }}</h6>
              <p  class="p-4">{{ project.description }}</p>
            </div>
          </div>
  
          <!-- HypeHive last, default white background -->
          <div class="row align-items-center mb-5 py-4">
            <div class="col-md-6 text-center">
              <img :src="hypehive.image" class="img-fluid w-75" alt="HypeHive Logo" />
            </div>
            <div class="col-md-6 text-center ">
              <h3 class="text-warning">{{ hypehive.title }}</h3>
              <h6 class="text-body-secondary">{{ hypehive.role }}</h6>
              <p class="p-4">{{ hypehive.description }}</p>
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
        allProjects: [
          {
            title: "Orgbee",
            role: "Developer & QA",
            description:
              "A centralized platform for student organizations, offering seamless registration, event management, and a freedom wall for student engagement.",
            image: require('@/assets/orgbee.png'),
            link: "https://youtu.be/VCBvzY_kwdk"
          },
          {
            title: "QuotLab & ISync",
            role: "Developer & DA",
            description:
              "A digital quotation and calibration documentation platform streamlining processes for DOST-ITDI and reducing paper-based workflows.",
            image: require('@/assets/logoquotlab.png'),
            link: "https://youtu.be/KszPsXuNJzk"
          },
          {
            title: "HypeHive",
            role: "Developer",
            description:
              "HypeHive is an interactive social platform linked with Likha and Postify, designed to connect communities through photo sharing and status updates.",
            image: require('@/assets/hypehive.png'),
            link: "###"
          },
          {
            title: "Don't Touch My Egg",
            role: "Asset Maker",
            description:
              "A fast-paced arcade game where you control a mother duck on a mission to protect her eggs from various threats in a thrilling and challenging environment.",
            image: require('@/assets/dtmg.jpg'),
            link: "https://youtu.be/n114zmKna_8"
          }
        ]
      };
    },
    computed: {
      regularProjects() {
        return this.allProjects.filter(p => p.title !== "HypeHive");
      },
      hypehive() {
        return this.allProjects.find(p => p.title === "HypeHive");
      }
    },
    methods: {
        getYoutubeEmbedUrl(url) {
    if (!url || url === "###") return "";
    // Check if URL is from YouTube
    const videoIdMatch = url.match(/(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return "";  // Return empty if URL is invalid
  }
    }
  };
  </script>
  
  <style scoped>
  .ratio {
    aspect-ratio: 16/9;
  }
  .alt-bg {
    background-color: #4d392a;
  }
  </style>
  