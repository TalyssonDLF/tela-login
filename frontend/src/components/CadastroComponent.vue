<template>
  <div class="container">
    <h1>Cadastro</h1>
    <form @submit.prevent="cadastrar">
      <label for="nome">Nome:</label>
      <input type="text" id="nome" v-model="nome" required>
      <br>
      <label for="idade">Idade:</label>
      <input type="number" id="idade" v-model="idade" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      <br>
      <label for="password">Senha:</label>
      <input type="password" id="password" v-model="password" required>
      <br>
      <label for="confirmPassword">Confirmar Senha:</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" required>
      <br>
      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
export default {
  name: 'CadastroComponent',
  data() {
    return {
      nome: '',
      idade: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    async cadastrar() {
      const toast = useToast();
      if (this.password !== this.confirmPassword) {
        toast.error('As senhas não coincidem.');
        return;
      }
      const user = {
        nome: this.nome,
        idade: this.idade,
        email: this.email,
        password: this.password
      };
      try {
        const response = await fetch('http://localhost:3000/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('userId', data.id); // Armazena o ID do usuário no localStorage
          toast.success('Cadastro bem-sucedido!');
          this.$router.push('/');
        } else {
          alert(data.message);
        }
      } catch (error) {
        toast.error('Erro ao cadastrar.');
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px; 
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h1 {
  text-align: center;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin: 10px 0 5px;
  color: #555;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #218838;
}
</style>