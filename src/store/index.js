import {
  createStore
} from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: "",
      nombre: "",
      categorias: [],
      estado: "",
      numero: 0,
    },
    user: null,
    error: {
      tipo: null,
      mensaje:null
    }
  },
  mutations: {
   
    // Login
    setUser(state, payload) {
      state.user = payload      
    },
    setError(state, payload) {
      if ( payload === null) {
        return state.error = {tipo:null, mensaje:null}
      }
      if (payload === 'EMAIL_NOT_FOUND') {
        return state.error = {tipo:'email', mensaje: 'El email no existe en la base de datos'}
      }
      if (payload === 'INVALID_PASSWORD') {
        return state.error = {tipo:'password', mensaje: 'La contraseña es incorrecta'}
      }
      if (payload === 'EMAIL_EXISTS') {
        return state.error = {tipo:'email', mensaje: 'El email ya está registrado'}
      }
      if (payload === 'INVALID_EMAIL') {
        return state.error = {tipo:'email', mensaje: 'Ingrese un email válido'}
      }
    },
    // Tareas
    cargar(state, payload) {
      state.tareas = payload
      // recuperar tareas como item de localstorage y pasarlas al state tareas de la vista
    },
    set(state, payload) {
      state.tareas.push(payload)
    },
    eliminar(state, payload) {
      state.tareas = state.tareas.filter(item => item.id != payload)
    },
    editar(state, payload) {
      if (!state.tareas.find(item => item.id === payload)) {
        router.push('/')
        return
      }
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    update(state, payload) {
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      // dentro del array de tareas va a mapear los items y buscar el que tenga el mismo ID que recibió de la acción updateTarea porque es la tarea que queremos editar. Si es igual entonces ese item objeto pasa a tener los valores del payload (tarea nueva). Al finalizar devolvemos un array (state.tareas) con la tarea modificada.
      router.push('/')
      localStorage.setItem('tareas', JSON.stringify(state.tareas))
    } 
  },
  actions: {
    // Login
    async registrarUsuario({commit}, usuario) {
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNDazkw6XQ2HSXSltMy1BR7DAaPoOTKAc',
        {
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          })
        })
        const userDB = await res.json()
        if ( userDB.error ) {
          console.log(userDB.error)
          return commit('setError', userDB.error.message)
        }
        commit('setError', null)
        commit('setUser', userDB)
        localStorage.setItem('usuario', JSON.stringify(userDB))
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    async ingresarUsuario({commit}, usuario) {
      try {
        const res = await fetch ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNDazkw6XQ2HSXSltMy1BR7DAaPoOTKAc', {
          method:'POST',
          body:JSON.stringify({
            email:usuario.email,
            password:usuario.password,
            returnSecureToken:true
          })
        });
        const userDB = await res.json()

        if ( userDB.error ) {
          console.log(userDB.error)
          return commit('setError', userDB.error.message)
        }

        commit('setUser', userDB)
        commit('setError', null)
        router.push('/')
        localStorage.setItem('usuario', JSON.stringify(userDB))
      } catch (error) {
        console.log(error)
      }
    },

    cerrarSesion({commit}) {
      commit('setUser', null)
      router.push('/ingreso')
      localStorage.removeItem('usuario')
    },

    // TAREAS
    async cargarDataBase({commit, state}) {
      if( localStorage.getItem('usuario')) {
        commit('setUser', JSON.parse(localStorage.getItem('usuario')))
      } else {
        return commit('setUser', null)
      }
      try {
        // estamos leyendo todas las tareas de la DB, en formato json
        const respuesta = await fetch (`https://api-firabase-vue-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
        // el método por defecto es GET
        const dataDB = await respuesta.json()
        const arrayTareas = []
        for (let tarea in dataDB) {
          arrayTareas.push(dataDB[tarea])
        }
        commit('cargar', arrayTareas)
      } catch (error) {
        console.log(error)
      }
    },
    async setTareas({commit, state}, tarea,){
      try {
        // en la url: "tareas" es el nombre del array y el paramétro es el ID identificatorio
       const rest = await fetch(`https://api-firabase-vue-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PUT',
          // se utiliza el método PUT porque no genera un ID automáticamente, y nosotros ya tenemos un ID generado en cada objecto (tarea)
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(tarea) // envio como json la tarea cargada
        }) 
        const dataDB = await rest.json()
        commit('set', dataDB)
      } catch (error) {
        console.log(error)
       }
      
      
    },

    async deleteTareas({commit, state}, id){
      try {
        const res = fetch(`https://api-firabase-vue-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
          method: 'DELETE',
        })
        commit('eliminar', id)
      } catch (error) {
        console.log(error)
      }
      
    },

    editarTarea({commit}, id) {
      commit('editar', id)
    },

    async updateTarea({commit, state}, tarea){
      try { 
        const res = fetch(`https://api-firabase-vue-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PATCH',
          body: JSON.stringify(tarea)
        })
        commit('update', tarea)
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {
    usuarioAutenticado(state) {
      return !!state.user // "user" es del state. Si la comprobación es nula retornará un falso sino true
      
    }
  },
  modules: {}
})