<template>
  <div class="form-group">
    <label for="">Nombre de la tarea</label>
    <input
      type="text"
      class="form-control"
      aria-describedby="emailHelp"
      v-model.trim="tarea.nombre"
    />
  </div>
  <div class="my-3">
    <h6 class="mb-2">Skills requeridos</h6>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        id="inlineCheckbox1"
        value="JavaScript"
        v-model="tarea.categorias"
      />
      <label class="text-secondary form-check-label" for="inlineCheckbox1">JavaScript</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        id="inlineCheckbox2"
        value="NodeJS"
        v-model="tarea.categorias"
      />
      <label class="text-secondary form-check-label" for="inlineCheckbox2">NodeJS</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        id="inlineCheckbox3"
        value="CSS"
        v-model="tarea.categorias"
      />
      <label class="text-secondary form-check-label" for="inlineCheckbox3">CSS</label>
    </div>
  </div>
  <div class="my-3">
    <h6 class="mb-2">Prioridad</h6>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        id="inlineRadio1"
        value="Relax"
        v-model="tarea.estado"
      />
      <label class="text-secondary form-check-label" for="inlineRadio1">Relax</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        id="inlineRadio2"
        value="Urgente"
        v-model="tarea.estado"
      />
      <label class="text-secondary form-check-label" for="inlineRadio2">Urgente</label>
    </div>
  </div>
  <div class="my-3">
    <div class="form-group">
      <label for="">Horas estimadas</label>
      <input type="number" class="form-control" v-model.number="tarea.numero" />
    </div>
  </div>
  
  <button
    type="submit"
    class="btn btn-success d-block ml-auto mt-5"
    :disabled="bloquear"
  >
    Guardar
  </button>
</template>

<script>
export default {
  props: {
    tarea: Object,
  },
  computed: {
    bloquear() {
      return this.tarea.nombre.trim() === "" ? true : false;
    },
  },
};
</script>
