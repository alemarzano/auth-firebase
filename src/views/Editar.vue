<template>
  <h4 class="mt-5 mb-3">Editar tarea</h4>
  <form @submit.prevent="updateTarea(tarea)">
    <Inputs :tarea="tarea"/>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Inputs from '../components/Inputs';

export default {
  components: {
    Inputs
  },
  computed: {
    ...mapState(['tarea'])
  },
  methods: {
    ...mapActions(['editarTarea', 'updateTarea'])
  },
  created() {
    this.editarTarea(this.$route.params.id)
  }
}
</script>

<style>

</style>