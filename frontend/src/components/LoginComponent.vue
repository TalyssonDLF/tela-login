<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn">Login</button>
      </form>
      <button class="btn cadastro-button" @click="irParaCadastro">Cadastrar</button>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';

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
      const toast = useToast();
      const credentials = {
        email: this.email,
        password: this.password
      };
      try {
        console.log('Tentando fazer login com as credenciais', credentials);
        const response = await fetch('http://localhost:3000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });
        const data = await response.json();
        console.log('Resposta da API:', data);
        if (response.ok) {
          localStorage.setItem('userId', data.id); // Armazena o ID do usuário no localStorage
          toast.success('Login bem-sucedido!');
          this.$router.push('/home'); // Redireciona para a tela de home após o login
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        toast.error('Erro ao fazer login.');
      }
    },
    irParaCadastro() {
      this.$router.push('/cadastro');
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-box {
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.btn:hover {
  background-color: #0056b3;
}

.cadastro-button {
  background-color: #28a745;
}

.cadastro-button:hover {
  background-color: #218838;
}
</style>