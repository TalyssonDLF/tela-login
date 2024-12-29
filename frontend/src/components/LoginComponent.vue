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
      <button type="submit">Entrar</button>
    </form>
    <p>Não tem uma conta? <router-link to="/cadastro">Cadastre-se</router-link></p>
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
    login() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.email === this.email && user.password === this.password);
      if (user) {
        alert('Login bem-sucedido!');
        this.$router.push('/home');
      } else {
        alert('Email ou senha incorretos.');
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h1 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label, input, button {
  margin: 10px 0;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>