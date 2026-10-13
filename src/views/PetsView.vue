<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

//chamar a minha API para listar todos os pets
const pets = ref([]); //lista de pets vazia
const tutores = ref([]); //lista tutores vazia

//chamando a minha API geral
const API_URL = 'http://localhost:3000';

//chamar a minha API para listar todos os pets e tutores
async function carregarDados() {
  const respostaPets = await fetch(`${API_URL}/pets`); //fetch é pra botar o servidor, await
  pets.value = await respostaPets.json();

  const respostaTutores = await fetch(`${API_URL}/tutores`);
  tutores.value = await respostaTutores.json();

  console.log('PETS -', pets.value);
  console.log('TuToReS -', tutores.value);
}

//exibir nome do tutor
function nomeDoTutor(tutorId){
  for(const tutor of tutores.value){
    if(tutor.id === tutorId){
      return tutor.nome;
    }
  }
  return 'opssss, tutor não encotrado'
}

async function excluirPet(id){
  const confirmarExclusao = window.confirm('Deseja excluir o pet?');

  if(confirmarExclusao){
    //logica para excluir o pet
    await fetch(`${API_URL}/pets/${id}`, {
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
      <h1 class="text-2xl font-bold">Listagem de Pets</h1>
      <p class="text-body-secondary mb-0">
        Listagem dos Pets cadastrados no sistema.
      </p>
    </header>

    <table class="table table-stripped table-hover">
      <thead>
        <th>ID</th>
        <th>NOME</th>
        <th>ESPÉCIE</th>
        <th>TUTOR</th>
        <th>AÇÕES</th>
      </thead>
      <tbody>
        <tr
          v-for="pet in pets"
          :key="pet.id"
        >
          <td>{{ pet.id }}</td>
          <td>{{ pet.nome }}</td>
          <td>{{ pet.especie }}</td>
          <td>{{ nomeDoTutor(pet.tutorId) }}</td>
          <td>
            <RouterLink :to="`/pets/${pet.id}`"> Visualizar </RouterLink>
            <button class="btn btn-danger" @click="excluirPet(pet.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
