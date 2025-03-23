<template>
  <div class="justify-content-center align-items-center mb-4">
      <navComponent />
      <main class="main container bg-white p-4 rounded shadow-lg mt-5" id="step-profile">
          <div class="top d-flex align-items-center justify-content-center g-2 p-4">
              <div class="left p-2">
                  <img src="../assets/almeavatar.png" alt="Profile Picture"
                      class="img-fluid rounded-circle border border-5 border-danger" />
              </div>
              <div class="right p-4">
                  <h1 class="text-danger">Almera Mentok</h1>
                  <a id="step-comments">
                      <RouterLink to="/comment">See Comments</RouterLink>
                  </a>
                  <p>
                      Hi, I’m Alme! I’m an IT student at PUP-Taguig. I love giving gifts
                      and organizing things—I find joy in making things neat and thoughtful.
                      I also have a background in programming and enjoy learning new skills along the way.
                  </p>
                  <button id="startTourBtn" class="btn btn-danger mt-2" @click="startTour">Start Tour</button>
              </div>
          </div>
      </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import navComponent from './navComponent.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(route.path);

document.addEventListener("DOMContentLoaded", function () {
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
});

onMounted(() => {
  console.log('Component mounted');
});
</script>

<style>
@import 'shepherd.js/dist/css/shepherd.css';
</style>