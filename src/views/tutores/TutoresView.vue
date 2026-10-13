<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const tutores = ref([]); 

const API_URL = 'http://localhost:3000';

async function carregarDados() {
 const respostaTutores = await fetch(`${API_URL}/tutores`);
  tutores.value = await respostaTutores.json();

  console.log('TuToReS -', tutores.value);
}

async function excluirPet(id){
  const confirmarExclusao = window.confirm('Deseja excluir?');

  if(confirmarExclusao){
    await fetch(`${API_URL}/tutores/${id}`, {
      method: 'DELETE',
    });

    await carregarDados();
  }
}

onMounted(carregarDados);
</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Listagem de Tutores</h1>
      <p class="text-body-secondary mb-0">
        Listagem dos tutores cadastrados no sistema.
      </p>
    </header>

    <table class="table table-stripped table-hover">
      <thead>
        <th>ID</th>
        <th>NOME</th>
        <th>TELEFONE</th>
        <th>AÇÕES</th>
      </thead>
      <tbody>
        <tr
          v-for="tutor in tutores"
          :key="tutor.id"
        >
          <td>{{ tutor.id }}</td>
          <td>{{ tutor.nome }}</td>
          <td>{{ tutor.telefone }}</td>
          <td>
            <RouterLink :to="`/tutores/${tutor.id}`"> Visualizar </RouterLink>
            <button class="btn btn-danger" @click="excluirPet(tutor.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>