<template>
  <div class="home">
    <h4 class="mt-5 mb-3">Agregar tarea nueva</h4>
    <form @submit.prevent="procesarFormulario">
      <Inputs :tarea="tarea" />
    </form>
    <ListaTareas/>
  </div>
</template>

<script>
// @ is an alias to /src
import Inputs from "../components/Inputs";
import ListaTareas from "../components/ListaTareas";
import { mapActions } from 'vuex';
const shortid= require('shortid');
export default {
  name: "Home",
  components: {
    Inputs,
    ListaTareas
  },
  data() {
    return {
      tarea: {
        id: "",
        nombre: "",
        categorias: [],
        estado: "",
        numero: 0,
      },
    };
  },
  methods: {
    ...mapActions(['setTareas', 'cargarDataBase']),
    procesarFormulario() {
      if (this.tarea.nombre.trim() === "") {
        console.log("Campo Vacio");
        return; // este return hace que salga del método
      }
      // generar id
      this.tarea.id = shortid.generate()

      // enviar los datos
      this.setTareas(this.tarea)

      // vaciar campos
      this.tarea = {
        id:'',
        nombre: "",
        categorias: [],
        estado: "",
        numero: 0,
      };
    },
  },
  created () {
    this.cargarDataBase()
  }
};
</script>
