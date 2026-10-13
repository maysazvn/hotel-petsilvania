import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/pets',
    },
    {
      path: '/pets',
      name: 'pets',
      component: () => import('../views/pets/PetsView.vue'),
    },
    {
      path: '/pets/novo',
      name: 'addPet',
      component: () => import('../views/pets/AddPetsView.vue'),
    },
    {
      path: '/pets/:id',
      name: 'detalhes-pet',
      component: () => import('../views/pets/PetDetailsView.vue'),
    },
    {
      path: '/tutores',
      name: 'tutores',
      component: () => import('../views/tutores/TutoresView.vue'),
    },
    {
      path: '/tutores/novo',
      name: 'addTutores',
      component: () => import('../views/tutores/AddTutoresView.vue'),
    },
    {
      path: '/tutores/:id',
      name: 'detalhes-tutores',
      component: () => import('../views/tutores/TutoresDetailsView.vue'),
    },
  ],
});

export default router;
