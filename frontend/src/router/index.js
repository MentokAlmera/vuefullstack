import { createRouter, createWebHistory } from 'vue-router';
import homeComponent from '@/components/homeComponent.vue';
import interestHobComponent from '@/components/interestHobComponent.vue';
import goalsComponent from '@/components/goalsComponent.vue';
import projectComponent from '@/components/projectComponent.vue';
import commentComponent from '@/components/commentComponent.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: homeComponent },     
    { path: '/goals', component: goalsComponent },
    { path: '/project', component: projectComponent },
    { path: '/interesthob', component: interestHobComponent },
    { path: '/comment', component: commentComponent },
  ]
});

export default router;
