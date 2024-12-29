<template>
  <div class="container">
    <header>
      <router-link to="/perfil" class="perfil-icon">Perfil</router-link>
    </header>
    <h1>Bem-vindo!</h1>
    <button @click="abrirListaUsuarios">Abrir Lista de Usuários</button>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  methods: {
    abrirListaUsuarios() {
      alert("Lista de usuários será aberta aqui.");
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

header {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #f0f0f0;
}

.perfil-icon {
  text-decoration: none;
  color: #000;
  font-weight: bold;
}

h1 {
  text-align: center;
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