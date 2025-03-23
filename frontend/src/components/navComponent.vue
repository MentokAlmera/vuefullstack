<template>
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark justify-content-center align-items-center">
    <div class="container" id="panel1">
      <button
        class="navbar-toggler border-light"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav gap-3 ms-auto">
          <li class="nav-item" id="panel-1">
            <RouterLink class="nav-link text-light" to="/">Home</RouterLink>
          </li>
          <li class="nav-item" id="panel-2">
            <RouterLink class="nav-link text-light" to="/interesthob">Interests & Hobbies</RouterLink>
          </li>
          <li class="nav-item" id="panel-3">
            <RouterLink class="nav-link text-light" to="/project">Projects</RouterLink>
          </li>
          <li class="nav-item" id="panel-4">
            <RouterLink class="nav-link text-light" to="/goals">Goals</RouterLink>
          </li>
          <li class="nav-item" id="panel-5">
            <a
              href="https://almeportfolio.my.canva.site"
              target="_blank"
              rel="noopener noreferrer"
              class="nav-link text-light"
            >
              Internship
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(route.path);

onMounted(() => {
  console.log('Navbar component mounted');
});
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';

.navbar-nav .nav-link {
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
  cursor: pointer;
}

.navbar-nav .nav-link:hover {
  color: #d35400 !important; 
}
</style>
