<template>
  <div class="container">
    <h1>Cadastro</h1>
    <form @submit.prevent="cadastrar">
      <label for="name">Nome:</label>
      <input type="text" id="name" v-model="name" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      <br>
      <label for="password">Senha:</label>
      <input type="password" id="password" v-model="password" required>
      <br>
      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CadastroComponent',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    cadastrar() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push({ name: this.name, email: this.email, password: this.password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Cadastro bem-sucedido!');
      this.$router.push('/');
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
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>