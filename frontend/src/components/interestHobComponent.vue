<template>
    <NavComponent />
    <div class="container bg-white p-5 text-center mt-5">
      <h1 class="name">Interests and Hobbies</h1>
  
      <section class="d-flex justify-content-center align-items-center my-4">
        <div class="container">
          <div class="row justify-content-center">
            <template v-if="hobbies.length > 0">
              <div
                v-for="(hobby, index) in hobbies"
                :key="index"
                class="card col-md-4 col-lg-3 m-2"
              >
                <div class="card-body p-3">
                  <h5 class="card-title text-center fw-bold fs-3">{{ hobby.title }}</h5>
                  <p class="card-text text-center">{{ hobby.description }}</p>
                  <button @click="openHobbyModal(hobby)" class="btn btn-brown mt-2">See More</button>
                </div>
              </div>
            </template>
            <p v-else class="text-center">NO DATA AVAILABLE</p>
          </div>
        </div>
      </section>
  
      <!-- Modal -->
      <div v-if="showHobbyModal" class="modal-overlay">
        <div class="modal-content row">
          <div class="modal-buttons text-end w-100">
            <button @click="close" class="btn btn-danger">X</button>
          </div>
          <div class="p-4 text-center">
            <img
              :src="selectedHobby.image"
              :alt="selectedHobby.title"
              class="img-fluid rounded shadow m-4"
              style="max-height: 600px;"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavComponent from './navComponent.vue';
  
  export default {
    components: {
      NavComponent,
    },
    data() {
      return {
        hobbies: [
          {
            title: "KPOP",
            description: "Immersing myself in the world of Kpop, enjoying the catchy tunes and mesmerizing choreography.",
            image: require('@/assets/pp.png')
          },
          {
            title: "Fashion",
            description: "Exploring different styles and trends, expressing my personality through unique outfits and accessories.",
            image: require('@/assets/pp.png')
          },
          {
            title: "Travel",
            description: "Embarking on exciting journeys to new destinations, creating memories that last a lifetime.",
            image: require('@/assets/pp.png')
          },
          {
            title: "Organizing",
            description: "Finding joy in tidying up and creating an orderly environment, making life more efficient and enjoyable.",
            image: require('@/assets/pp.png')
          },
          {
            title: "Dancing",
            description: "Expressing emotions through rhythm and movement, and having fun while doing it!",
            image: require('@/assets/pp.png')
          },
          {
            title: "Writing",
            description: "Telling stories, journaling my thoughts, or simply letting creativity flow with words.",
            image: require('@/assets/pp.png')
          },
        ],
        showHobbyModal: false,
        selectedHobby: null,
      };
    },
    methods: {
      openHobbyModal(hobby) {
        this.selectedHobby = hobby;
        this.showHobbyModal = true;
      },
      close() {
        this.showHobbyModal = false;
        this.selectedHobby = null;
      },
    },
  };
  </script>
  
  <style scoped>


  .card-title {
    color: #4A3728;
  }
  
  .card-text {
    height: 100%;
    max-height: 100px;
    overflow: hidden;
  }
  
  .btn-brown {
    background-color: #4A3728;
    color: white;
    border: none;
    padding: 8px 14px;
    border-radius: 6px;
    transition: 0.3s ease;
  }
  
  .btn-brown:hover {
    background-color: #3a2a1e;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    width: auto;
    max-height: auto;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
  }
  
  .modal-buttons {
    position: absolute;
    top: 20px;
    right: 30px;
  }
  </style>
  