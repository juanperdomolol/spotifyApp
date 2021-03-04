<template>
  <div >
    <div v-show="validateInfo(dataItem)">
      <h1>No se encontraron resultados</h1>
    </div>
    <b-col class="center">
      <b-card
        :title="dataItem.nombre"
        :img-src="dataItem.images"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem "
        class="mb-6 mr-4 mt-5"
        bg-variant="dark"
      >
        <b-card-body :title="dataItem.artistas" class="text-info" >
          <!-- <b-button @click="idArtista">Ver Artista</b-button> -->
          <a :href="`/artists/${dataItem.artistaId}`" 
            class="btn btn-info">Ver artista</a>
          
        </b-card-body>
      </b-card>
    </b-col>
  </div>
</template>
<script>
export default {
  props: {
    dataItem: {
      type: Object,
    },
  },
  methods:{
    validateInfo(data){
      if(data.length>0){
        return true
      }
      return false
    }
  }
};
</script>
<style scoped>
.card {
  float: left;
  width: 280px;
  height: 550px;
 
}
</style>