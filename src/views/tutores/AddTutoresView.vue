<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter(); 
const API_URL = 'http://localhost:3000'; 

const tutores = ref([]); 

const novoTutor = ref({
  nome: '',
  cpf: '',
  telefone: '',
  email: '',
  data: '',
  observacoes: '',
  endereco: {
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
  },
})

async function carregarTutores() {
  const resposta = await fetch(`${API_URL}/tutores`); 

  tutores.value = await resposta.json();
  console.table(tutores.value);
}

async function salvarTutor() {
await fetch(`${API_URL}/tutores`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(novoTutor.value)
});

router.push('/tutores');
}

onMounted(carregarTutores);

</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Cadastrar tutires</h1>
      <p class="text-body-secondary mb-0">
        Cadastro dos tutores cadastrados no sistema.
      </p>
    </header>

    <RouterLink
      class="btn btn-primary"
      :to="{ name: 'addTutores' }"
    >
      Adicionar tutor
    </RouterLink>

    <form @submit.prevent="salvarTutor" class="row">

      <!-- nome -->
      <div class="col-md-6">
        <label for="nome" class="form-label">
          Nome do tutor:
        </label>
        <input type="text" placeholder="João" class="form-control" id="nome" v-model="novoTutor.nome" required>
      </div>

      <!-- telefone -->
      <div class="col-md-6">
        <label for="nome" class="form-label">
          Telefone do tutor:
        </label>
        <input type="tel" maxlength="15" placeholder="(11) 99999-9999" class="form-control" id="nome" v-model="novoTutor.telefone" required>
      </div>

      <div class="col-md-6">
        <label for="nome" class="form-label">
          CPF do tutor:
        </label>
        <input type="text" maxlength="14" placeholder="000.000.000-00" class="form-control" id="nome" v-model="novoTutor.cpf" required>
      </div>

       <div class="col-md-6">
        <label for="nome" class="form-label">
          E-mail do tutor:
        </label>
        <input type="email" placeholder="email@gmail.com" class="form-control" id="nome" v-model="novoTutor.email" required>
      </div>

      <div class="col-md-6">
        <label for="nome" class="form-label">
          Data de nascimento do tutor:
        </label>
        <input type="date" class="form-control" id="nome" v-model="novoTutor.data" required>
      </div>

      <!-- final -->
      <div class="col-12 d-flats gap-2">
        <button class="btn btn-success" type="submit">Salvar tutor</button>
      </div>
    </form>
  </div>
</template>