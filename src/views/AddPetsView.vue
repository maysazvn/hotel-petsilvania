<script setup>
//funcao que vai chamar tutores, fazer um get pra pegar todos os tutores do bd.
//nova funcao salvar pet, metodo post pra salvar pet (nome, especie, tutorID)
//sem tutor n pode salvar

import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter(); //chamando meu router
const API_URL = 'http://localhost:3000'; //chamando meu api

const tutores = ref([]); 

//criar obj pra salvar um novo pet
//propriedades: nome, especie, tutorID

const novoPet = ref({
  nome: '',
  especie: '',
  tutorId: ''
})

//buscar todos os tutores q estao salvos na aplicacao

async function carregarTutores() {
  const resposta = await fetch(`${API_URL}/tutores`); //await = depende de algo de fora

  //converter os dados da minha API que estao em JSON para JS
  tutores.value = await resposta.json();
  console.table(tutores.value);
}

//salvar o pet
async function salvarPet() {
await fetch(`${API_URL}/pets`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(novoPet.value)
});

//redirecionar para a tela de listagem de pets
router.push('/pets');
}


onMounted(carregarTutores) //sempre no final, passar algo dentro do () pra quando renderizar passar as coisas ali
</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Cadastrar Pets</h1>
      <p class="text-body-secondary mb-0">
        Cadastro dos Pets cadastrados no sistema.
      </p>
    </header>

    <RouterLink
      class="btn btn-primary"
      :to="{ name: 'addPet' }"
    >
      Adicionar Pet
    </RouterLink>

    <form @submit.prevent="salvarPet" class="row">
<!-- nome do pet -->
      <div class="col-md-6">
        <label for="nome" class="form-label">
          Nome do Pet:
        </label>
        <input type="text" class="form-control" id="nome" v-model="novoPet.nome" required>
      </div>
<!-- especie -->
      <div class="col-md-6">
        <label for="especie" class="form-label">Espécie:</label>

        <select name="especie" id="especie" class="form-select" required v-model="novoPet.especie">
<option value="" disabled>Selecione a espécie:</option>
        <option value="cachorro">Cachorro</option>
                <option value="cachorro">Coelho</option>
        <option value="cachorro">Tartaruga</option>
        </select>

      </div>

      <!-- nome tutor -->
      <div class="col-md-6">
        <label for="tutor" class="form-label">Tutor:</label>

        <select name="tutor" id="tutor" class="form-select" v-model="novoPet.tutorId">
          <option value="" disabled>Selecione o tutor</option>
          <option v-for="tutor in tutores" 
          :key="tutor.id" 
          :value="tutor.id">
          {{ tutor.nome }}</option>
        </select>
      </div>

      <div class="col-12 d-flats gap-2">
        <button class="btn btn-success" type="submit">Salvar Pet</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
