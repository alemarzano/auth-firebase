<template>
  <h1 class="mt-3 text-center">Registro de Usuarios</h1>
  <div class="col-12 col-md-6 mx-auto">
     <div class="alert alert-danger" v-if="error.tipo != null">
      {{ error.mensaje }}
    </div>
    <form class="mt-3" @submit.prevent="procesarFormulario">
    <div class="form-group">
      <label for="">email</label>
      <input type="text" class="form-control" 
      v-model.trim="email"
      :class="[error.tipo === 'email' ? 'is-invalid' : '']"
      />
    </div>
    <div class="form-group">
      <label for="">Password</label>
      <input type="password" class="form-control" v-model.trim="pass1"/>
    </div>
    <div class="form-group">
      <label for="">Confirm password</label>
      <input type="password" class="form-control" v-model.trim="pass2"/>
    </div>
      <button type="submit" class="btn btn-primary my-4 d-block ml-auto" :disabled="habilitarBoton">Registrarse</button>
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
      pass2: '',
    }
  },
  computed : {
    habilitarBoton () {
      if (!this.email.includes('@')) {
        return true
      }
      else if (this.pass1.length > 6 && this.pass1 === this.pass2) {
        return false
      }
      return true
    },
    ...mapState (['error']) 
  },
  methods: {
    ...mapActions(['registrarUsuario']),
    async procesarFormulario () {
      await this.registrarUsuario({email:this.email, password:this.pass1})
      if(this.error.tipo !== null) {
        return 
      }
      this.email = ''
      this.pass1 = '' 
      this.pass2 = '' 
    }
  }
};
</script>
