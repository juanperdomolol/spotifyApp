<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">
          <img src="@/assets/spotify-3.png" class="sm" width="120 " />
        </b-navbar-brand>

        <b-input-group>
          <b-nav-form class="mr-5">
            <b-input-group-prepend>
              <b-button
                variant="secondary"
                class="material-icons"
                @click="searchArtista"
              >
                search
              </b-button>
            </b-input-group-prepend>
            <b-form-input
              v-model="artista"
              class="mr-sm-2"
              placeholder="Buscar Artista"
              :disabled="validateCancion"
              @keyup="searchArtista(artista)"
            ></b-form-input>
          </b-nav-form>

          <b-nav-form class="mr-5">
            <b-input-group-prepend>
              <b-button variant="secondary" class="material-icons">
                search
              </b-button>
            </b-input-group-prepend>
            <b-form-input
              v-model="cancion"
              @keyup="searchCancion(cancion)"
              :disabled="validateArtista"
              class="mr-sm-2"
              placeholder="Buscar Cancion"
            ></b-form-input>
          </b-nav-form>
        </b-input-group>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      </b-navbar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      artista: "",
      cancion: "",
    };
  },
  computed: {
    validateCancion() {
      // if(this.$route != path:/)return true;
      if (this.cancion != "") return true;
      return false;
    },
    validateArtista() {
      // if(this.$route!= "/") return true;
      if (this.artista != "") return true;
      return false;
    },
  },
  methods: {
    searchArtista(texto) {
      this.$store.dispatch("getArtista", texto);
    },
    searchCancion(texto) {
      // this.$store.commit('setSong',this.cancion)
      this.$store.dispatch("getCancion",texto);
    },
  },
};
</script>