<template class="main">
  <div class="justify-content-center align-items-center">
    <navComponent />
    <main class="p-4" id="step-profile">
      <div class="content-wrapper">
        <div class="image-section">
          <img src="../assets/alme-bb.jpg" alt="Profile Picture" class="profile-image" />
        </div>
        <div class="text-section">
          <h1 class="name">ALMERA MENTOK</h1>
          <p class="bio">
            Hi, I'm Alme! I'm an IT student at PUP-Taguig. I love giving gifts and organizing things—I find joy in
            making things neat and thoughtful. I also have a background in programming and enjoy learning new skills
            along the way.
          </p>
          <div class="d-flex align-items-center justify-content-center flex-wrap">
            <button id="startTourBtn" class="btn btn-brown mt-2 me-2" @click="startTour">Start Tour</button>
            <button id="step-comments" class="btn btn-brown mt-2 me-2" @click="goToComments">Comments</button>
            <button id="step-gallery" class="btn btn-brown mt-2" @click="goToGallery">Gallery</button>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import navComponent from './navComponent.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const goToComments = () => {
  router.push('/comment');
};

const goToGallery = () => {
  router.push('/gallery');
};


const startTour = () => {
  if (typeof Shepherd === "undefined") {
    console.error("Shepherd.js is not loaded.");
    return;
  }

  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      classes: "shadow-md bg-purple-dark",
      scrollTo: true,
    },
  });

  tour.addStep({
    title: "Navbar",
    text: "This is the navigation bar, where you can access different sections of the site",
    attachTo: {
      element: "#panel1",
      on: "bottom",
    },
    buttons: [
      {
        text: "Next",
        action: tour.next,
      },
      {
        text: "Finish",
        action: tour.complete,
      },
    ],
  });

  tour.addStep({
    title: "Home",
    text: "This is for home section",
    attachTo: {
      element: "#panel-1",
      on: "bottom",
    },
    buttons: [
      {
        text: "Back",
        action: tour.back,
      },
      {
        text: "Next",
        action: tour.next,
      },
      {
        text: "Finish",
        action: tour.complete,
      },
    ],
  });

  tour.addStep({
    title: "Interests and Hobbies",
    text: "Click to see my inetrests and hobbies",
    attachTo: {
      element: "#panel-2",
      on: "bottom",
    },
    buttons: [
      {
        text: "Back",
        action: tour.back,
      },
      {
        text: "Next",
        action: tour.next,
      },
      {
        text: "Finish",
        action: tour.complete,
      },
    ],
  });

  tour.addStep({
    title: "Project",
    text: "This section contains my project",
    attachTo: {
      element: "#panel-3",
      on: "bottom",
    },
    buttons: [
      {
        text: "Back",
        action: tour.back,
      },
      {
        text: "Next",
        action: tour.next,
      },
      {
        text: "Finish",
        action: tour.complete,
      },
    ],
  });

  tour.addStep({
    title: "Goals",
    text: "Click here to view my goals",
    attachTo: {
      element: "#panel-4",
      on: "bottom",
    },
    buttons: [
      {
        text: "Back",
        action: tour.back,
      },
      {
        text: "Next",
        action: tour.next,
      },
      {
        text: "Finish",
        action: tour.complete,
      },
    ],
  });

  tour.addStep({
    title: "Internship",
    text: "Click to see my internship details and documents.",
    attachTo: {
      element: "#panel-5",
      on: "top",
    },
    buttons: [
      {
        text: "Back",
        action: tour.back,
      },
      {
        text: "Next",
        action: tour.next,
      },
      {
        text: "Finish",
        action: tour.complete,
      },
    ],
  });

  tour.addStep({
    title: "Profile Section",
    text: "Here is my profile, including my picture, name, and bio.",
    attachTo: {
      element: "#step-profile",
      on: "bottom",
    },
    buttons: [
      {
        text: "Back",
        action: tour.back,
      },
      {
        text: "Next",
        action: tour.next,
      },
      {
        text: "Finish",
        action: tour.complete,
      },
    ],
  });

  tour.addStep({
    title: "Comments",
    text: "Click to see and add comments about me.",
    attachTo: {
      element: "#step-comments",
      on: "bottom",
    },
    buttons: [
      {
        text: "Back",
        action: tour.back,
      },
      {
        text: "Next",
        action: tour.next,
      },
      {
        text: "Finish",
        action: tour.complete,
      },
    ],
  });

  tour.addStep({
    title: "Gallery",
    text: "Click to see and add pics about me.",
    attachTo: {
      element: "#step-gallery",
      on: "bottom",
    },
    buttons: [
      {
        text: "Back",
        action: tour.back,
      },
      {
        text: "Next",
        action: tour.next,
      },
      {
        text: "Finish",
        action: tour.complete,
      },
    ],
  });

  tour.addStep({
    title: "Restart Tour",
    text: "Click this button anytime to restart the tour.",
    attachTo: {
      element: "#startTourBtn",
      on: "top",
    },
    buttons: [
      {
        text: "Back",
        action: tour.back,
      },
      {
        text: "Finish",
        action: tour.complete,
      },
    ],
  });

  document
    .getElementById("startTourBtn")
    .addEventListener("click", function () {
      tour.start();
    });

};

onMounted(() => {
  console.log('Component mounted');
});
</script>

<style>
@import 'shepherd.js/dist/css/shepherd.css';

.content-wrapper {
  display: flex;
  align-items: center;
  gap: 4rem;
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem;
}

.image-section {
  flex: 1;
}

.profile-image {
  width: 100%;
  max-width: 600px;
  height: auto;
}

.text-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
}

.name {
  font-size: 5.0rem;
  font-weight: bold;
  color: #4A3728;
  margin: 0;
  line-height: 1.2;
}

.bio {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4A3728;
  margin: 0;
}

.comments-link {
  color: #4A3728;
  text-decoration: none;
}

.btn-brown {
  background-color: #4A3728;
  color: white;
  border: none;
  padding: 10px 30px;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 20px;
}

.btn-brown:hover {
  background-color: #5c4534;
  color: white;
}

@media (max-width: 992px) {
  .content-wrapper {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  .profile-image {
    max-width: 300px;
  }

  .name {
    font-size: 2.5rem;
  }
}
</style>