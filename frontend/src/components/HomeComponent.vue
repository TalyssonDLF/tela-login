<template>
  <div class="container">
    <div class="header">
      <h1>Bem-vindo!</h1>
      <font-awesome-icon icon="user" class="profile-icon" @click="irParaPerfil" />
    </div>
    <div class="cep-container">
      <label for="cep">CEP:</label>
      <input type="text" id="cep" v-model="cep" placeholder="Digite o CEP" />
      <button @click="verificarCep">Verificar CEP</button>
      <p v-if="logradouro">Logradouro: {{ logradouro }}</p>
      <p v-if="bairro">Bairro: {{ bairro }}</p>
      <p v-if="cidade">Cidade: {{ cidade }}</p>
      <p v-if="uf">UF: {{ uf }}</p>
      <p v-if="codigoIBGE">Código do IBGE: {{ codigoIBGE }}</p>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useToast } from 'vue-toastification';

library.add(faUser);

export default {
  name: 'HomeComponent',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      cep: '',
      logradouro: '',
      uf: '',
      bairro: '',
      cidade: '',
      codigoIBGE: ''
    };
  },
  methods: {
    irParaPerfil() {
      this.$router.push('/perfil');
    },
    async verificarCep() {
      const toast = useToast();
      if (this.cep.length !== 8) {
        toast.error('Por favor, insira um CEP válido com 8 dígitos.');
        return;
      }
      try {
        const response = await fetch(`https://viacep.com.br/ws/${this.cep}/json/`);
        const data = await response.json();
        if (data.erro) {
          toast.error('CEP não encontrado.');
          this.limparDados();
        } else {
          this.logradouro = data.logradouro || 'Não informado';
          this.uf = data.uf || 'Não informado';
          this.bairro = data.bairro || 'Não informado';
          this.cidade = data.localidade || 'Não informado';
          this.codigoIBGE = data.ibge || 'Não informado';
        }
      } catch (error) {
        toast.error('Erro ao buscar o CEP.');
        this.limparDados();
      }
    },
    limparDados() {
      this.logradouro = '';
      this.uf = '';
      this.bairro = '';
      this.cidade = '';
      this.codigoIBGE = '';
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  color: #333;
}

.profile-icon {
  font-size: 24px;
  cursor: pointer;
  color: #007bff;
}

.profile-icon:hover {
  color: #0056b3;
}

.cep-container {
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: calc(100% - 22px);
}

button {
  padding: 10px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #218838;
}

p {
  margin-top: 10px;
  color: #555;
}
</style>