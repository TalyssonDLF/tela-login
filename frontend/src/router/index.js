import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '../components/LoginComponent.vue';
import CadastroComponent from '../components/CadastroComponent.vue';
import HomeComponent from '../components/HomeComponent.vue';
import PerfilComponent from '../components/PerfilComponent.vue';
import EditarPerfilComponent from '../components/EditarPerfilComponent.vue';

const routes = [
  { path: '/', component: LoginComponent },
  { path: '/cadastro', component: CadastroComponent },
  { path: '/home', component: HomeComponent },
  { path: '/perfil', component: PerfilComponent },
  { path: '/editar-perfil', component: EditarPerfilComponent }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;