<template>
  <Navbar />
  <div class="container pb-5">
     <router-view />
  </div>
 
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Navbar from "./components/Navbar";
export default {
  components: {
    Navbar,
  },
  methods : {
    ...mapActions(['cargarDataBase'])
  },
  created () {
    this.cargarDataBase()
  }
};
</script>