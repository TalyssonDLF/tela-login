<template>
    <div class="container">
      <h1>Editar Perfil</h1>
      <form @submit.prevent="editarPerfil">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="user.nome" required>
        <br>
        <label for="idade">Idade:</label>
        <input type="number" id="idade" v-model="user.idade" required>
        <br>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required>
        <br>
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="user.password" required>
        <br>
        <button type="submit">Salvar</button>
      </form>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'EditarPerfilComponent',
    data() {
      return {
        user: {
          nome: '',
          idade: '',
          email: '',
          password: ''
        }
      };
    },
    async created() {
      try {
        const userId = localStorage.getItem('userId'); // Supondo que o ID do usuário esteja armazenado no localStorage
        if (!userId) {
          alert('Usuário não encontrado.');
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
        alert('Erro ao buscar dados do perfil.');
      }
    },
    methods: {
      async editarPerfil() {
        const userId = localStorage.getItem('userId'); // Supondo que o ID do usuário esteja armazenado no localStorage
        try {
          const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.user)
          });
          const data = await response.json();
          if (response.ok) {
            alert('Perfil atualizado com sucesso!');
            this.$router.push('/perfil');
          } else {
            alert(data.message);
          }
        } catch (error) {
          alert('Erro ao atualizar perfil.');
        }
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