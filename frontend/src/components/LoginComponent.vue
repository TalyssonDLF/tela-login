<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      <br>
      <label for="password">Senha:</label>
      <input type="password" id="password" v-model="password" required>
      <br>
      <button type="submit">Login</button>
    </form>
    <button class="cadastro-button" @click="irParaCadastro">Cadastrar</button>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      const credentials = {
        email: this.email,
        password: this.password
      };
      try {
        const response = await fetch('http://localhost:3000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('userId', data.id); // Armazena o ID do usuário no localStorage
          alert('Login bem-sucedido!');
          this.$router.push('/home'); // Redireciona para a tela de home após o login
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert('Erro ao fazer login.');
      }
    },
    irParaCadastro() {
      this.$router.push('/cadastro');
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px; /* Aumentar a largura da div */
  margin: 0 auto;
  padding: 40px; /* Aumentar o padding */
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
  margin-bottom: 20px;
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
  margin-bottom: 20px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}

.cadastro-button {
  display: block;
  width: 100%;
  margin-top: 20px;
  background-color: #28a745;
}

.cadastro-button:hover {
  background-color: #218838;
}
</style>