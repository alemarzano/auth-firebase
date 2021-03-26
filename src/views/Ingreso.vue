<template>
  <h1 class="mt-3 text-center">Ingresar</h1>
  <div class="col-12 col-md-6 mx-auto">
    <div class="alert alert-danger" v-if="error.tipo != null">
      {{ error.mensaje }}
    </div>
    <form class="mt-3" @submit.prevent="procesarFormulario">
    <div class="form-group">
      <label for="">Email</label>
      <input type="text" class="form-control" v-model.trim="email" 
      :class="[error.tipo === 'email' ? 'is-invalid' : '']" required/>
    </div>
    <div class="form-group">
      <label for="">Password</label>
      <input type="password" class="form-control" v-model.trim="pass1" :class="[error.tipo === 'password' ? 'is-invalid' : '']" required/>
    </div>
    
      <button type="submit" class="btn btn-primary my-4 d-block ml-auto" :disabled="habilitarBoton">Ingresar</button>
  </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      email: '',
      pass1: '',
    }
  },
  computed : {
    habilitarBoton () {
      if (!this.email.includes('@')) {
        return true
      }
      else if (this.pass1.length > 6) {
        return false
      }
      return true
    },
    ...mapState(['error'])
  },
  methods: {
    ...mapActions(['ingresarUsuario']),
    async procesarFormulario () {
      await this.ingresarUsuario({email:this.email, password:this.pass1})
      if(this.error.tipo !== null) {
        return 
      }
      this.email = ''
      this.pass1 = '' 
    }
  }
};
</script>

<style>

</style>