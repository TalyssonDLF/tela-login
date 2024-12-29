<template>
  <div class="container">
    <h1>Perfil do Usuário</h1>
    <p>Nome: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
  </div>
</template>

<script>
export default {
  name: 'PerfilComponent',
  data() {
    return {
      user: {}
    };
  },
  created() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Supondo que o primeiro usuário seja o logado
    this.user = users[0] || { name: 'Usuário Exemplo', email: 'usuario@exemplo.com' };
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
</style>