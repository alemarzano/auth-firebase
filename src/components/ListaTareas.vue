<template>
  <h4 class="mt-5 mb-3">Tareas cargadas</h4>
  <table class="table table-striped table-bordered table-hover table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Skilss</th>
        <th scope="col">Prioridad</th>
        <th scope="col">Horas</th>
        <th scope="col">Acción</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tareas" :key="item.id">
        <th scope="row">{{ item.id }}</th>
        <td>{{ item.nombre }}</td>
        <td>{{ item.categorias.join(", ") }}</td>
        <td>{{ item.estado }}</td>
        <td>{{ item.numero }}</td>
        <td>
          <button class="btn btn-outline-warning btn-sm mx-1" @click="deleteTareas(item.id)">
            Eliminar
          </button>
          <router-link 
          class="btn btn-outline-light btn-sm mx-1"
          :to="{
            name:'Editar',
            params:{
              id: item.id
            }
          }"
          >Editar</router-link>          
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["tareas"]),
  },
  methods: {
    ...mapActions(["deleteTareas"]),
  },
};
</script>
