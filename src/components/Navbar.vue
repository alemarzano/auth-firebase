<template>
  <div class="navbar navbar-dark bg-dark">
    <div class="container">
      <span class="navbar-brand" v-if="usuarioAutenticado"> {{user.email}} </span>
      <span class="navbar-brand" v-if="!usuarioAutenticado"> Tasker </span>
      <div class="d-flex">
        <div v-if="usuarioAutenticado">
          
          <router-link class="btn btn-outline-light mx-2" to="/"
            > Tareas</router-link
          >
          <button class="btn btn-secondary mx-2" @click="cerrarSesion">
            Cerrar Sesión
          </button>
        </div>
        <router-link
          class="btn btn-light mx-2"
          v-if="!usuarioAutenticado"
          to="/ingreso"
        >
          Iniciar Sesión
        </router-link>
        <router-link
          class="btn btn-outline-light mx-2"
          v-if="!usuarioAutenticado"
          to="/registro"
        >
          Registrarse
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters(["usuarioAutenticado"]),
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    ...mapActions(["cerrarSesion"]),
  },
};
</script>

<style>
</style>