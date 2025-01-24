<template>
  <div class="container">
    <h1>Perfil do Usuário</h1>
    <p>Nome: {{ user.nome }}</p>
    <p>Idade: {{ user.idade }}</p>
    <p>Email: {{ user.email }}</p>
    <button @click="voltarParaHome">Voltar para Home</button>
    <button @click="editarInformacoes">Editar Informações</button>
    <button class="logout" @click="logout">Logout</button>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
export default {
  name: 'PerfilComponent',
  data() {
    return {
      user: {
        nome: '',
        idade: '',
        email: ''
      }
    };
  },
  async created() {
    const toast = useToast();
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast.error('Usuário não encontrado.');
        return;
      }
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        this.user = data;
      } else {
        alert(data.message);
      }
    } catch (error) {
      toast.error('Erro ao buscar dados do perfil.');
    }
  },
  methods: {
    voltarParaHome() {
      this.$router.push('/home');
    },
    logout() {
      localStorage.removeItem('userId');
      this.$router.push('/');
    },
    editarInformacoes() {
      this.$router.push('/editar-perfil');
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  color: #333;
}

p {
  color: #555;
  margin: 10px 0;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}

.logout {
  background-color: red;
}
</style>