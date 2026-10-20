<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute();
const API_URL = 'http://localhost:3000';
const tutor = ref(null);
const petsVinculados = ref([]);
const idTutor = route.params.id;

async function carregar() {
  const idTutor = route.params.id;

  const respostaTutor = await fetch(`${API_URL}/tutores/${idTutor}`);
  console.log('respostaTutor', respostaTutor);
  tutor.value = await respostaTutor.json();
  console.log('tutor', tutor.value);

  const respostaPets = await fetch(`${API_URL}/pets`);
  petsVinculados.value = await respostaPets.json();
  console.log('PETS VINCULADOS -', petsVinculados.value);
}

const novoPet = ref({
  nome: '',
  especie: '',
  tutorId: idTutor
})

async function salvarPet() {
await fetch(`${API_URL}/pets`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(novoPet.value)
});

router.push('/tutores/:id');
}

onMounted(carregar);
</script>

<template>
  <section v-if="tutor == null">
    <p>caregandooooooolllllllkkkkkkkkkkkkk</p>
  </section>

  <section v-else>
    <div>
      <h1>Nome do tutor: {{ tutor.nome }}</h1>
    <p>Telefone: {{ tutor.telefone }}</p>
    <p>ID: {{ tutor.id }}</p>
                <p>CPF: {{ tutor.cpf }}</p>
            <p> EMAIL: {{ tutor.email }}</p>
            <p> DATA DE NASCIMENTO: {{ tutor.data }}</p>
            <p>OBSERVACOES: {{ tutor.observacoes }}</p>
    </div>

    <div>
      <h2>Endereço</h2>

      <p>Rua: {{ tutor.endereco.rua }}</p>
      <p>Número: {{ tutor.endereco.numero }}</p>
      <p>Bairro: {{ tutor.endereco.bairro }}</p>
      <p>Cidade: {{ tutor.endereco.cidade }}</p>
      <p>Estado: {{ tutor.endereco.estado }}</p>
      <p>Cep: {{ tutor.endereco.cep }}</p>
    </div>



    <div class="pet-vinculados">
      <h2>Pets Vinculados</h2>
      <table class="table table-stripped table-hover">
        <thead>
          <th>ID</th>
          <th>NOME</th>
          <th>ESPÉCIE</th>
          <th>AÇÕES</th>
        </thead>
        <tbody>
          <tr
            v-for="pet in petsVinculados"
            :key="pet.id"
          >
            <td>{{ pet.id }}</td>
            <td>{{ pet.nome }}</td>
            <td>{{ pet.especie }}</td>
            <td>
              <RouterLink :to="`/pet/${pet.id}`"> Visualizar </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="formulario">
      <h2>Cadastrar novo pet</h2>
      <p>O pet será vinculado a {{ tutor.nome }}</p>
      <form
        @submit.prevent="salvarPet"
        class="row"
      >
        <!-- nome do pet -->
        <div class="col-md-6">
          <label
            for="nome"
            class="form-label"
          >
            Nome do Pet:
          </label>
          <input
            type="text"
            class="form-control"
            id="nome"
            v-model="novoPet.nome"
            required
          />
        </div>

        <!-- especie -->

        <div class="col-md-6">
          <label for="especie">Espécie</label>
          <select
            name="especie"
            id="especie"
            class="form-select"
            required
            v-model="novoPet.especie"
          >
            <option
              value=""
              disabled
            >
              Selecione uma espécie
            </option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
            <option value="Coelho">Coelho</option>
            <option value="Tartaruga">Tartaruga</option>
          </select>
        </div>

        <div class="col-12 d-flats gap-2">
        <button class="btn btn-success" type="submit">Salvar Pet</button>
      </div>
      </form>
    </div>
  </section>
</template>
