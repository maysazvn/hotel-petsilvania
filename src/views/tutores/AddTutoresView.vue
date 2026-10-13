<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter(); 
const API_URL = 'http://localhost:3000'; 

const tutores = ref([]); 

const novoTutor = ref({
  nome: '',
  telefone: ''
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

      <div class="col-md-6">
        <label for="nome" class="form-label">
          Nome do tutor:
        </label>
        <input type="text" class="form-control" id="nome" v-model="novoTutor.nome" required>
      </div>

      <div class="col-md-6">
        <label for="nome" class="form-label">
          Telefone do tutor:
        </label>
        <input type="tel" class="form-control" id="nome" v-model="novoTutor.telefone" required>
      </div>

      <div class="col-12 d-flats gap-2">
        <button class="btn btn-success" type="submit">Salvar tutor</button>
      </div>
    </form>
  </div>
</template>