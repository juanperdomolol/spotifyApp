<template>
  <b-container fluid class="bv-example-row">
    <b-row>
      <b-col cols="4">
        <b-row>
          <!-- <h1> {{ $route.params }} </h1>  -->
          <b-col>
            <b-row>
              <h3 class="d-flex justify-content-center">
                {{ infoBasica.nombre }}
              </h3>
            </b-row>
          </b-col>
          <b-img
            :src="infoBasica.images"
            rounded="circle"
            class="avatar mt-3 center"
          ></b-img>
        </b-row>

        <b-row>
          <span>Generos:</span>
          <p>{{joinGenero(infoBasica.genero)}}</p>
          <!-- <div v-for="generos in infoBasica.genero" :key="generos.id">
            <p>{{ generos }},</p>
          </div> -->
          <span>Seguidores en Spotify {{ infoBasica.seguidores | formatNumber}}</span>
        </b-row>

        <b-row>
          <b-col v-for="(item, i) in releated.slice(0, 3)" :key="i">
            <a :href="`/artists/${item.id}`">
              <b-img
                thumbnail
                fluid
                :src="item.images[0].url"
                v-if="item.images[0].url"
              />
            </a>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="8">
        <b-row>
          <b-col>
            <b-row> <h1>Albums</h1> </b-row>
            <b-row>
              <b-col v-for="(album, i) in albums.slice(0, 4)" :key="i">
                <!-- <pre>{{album.images[0].url}}</pre> -->
                <b-card-group>
                  <b-card bg-variant="dark" :img-src="album.images[0].url">
                    <b-card-body>
                      <span> {{ album.nombre }}</span>
                      <p>{{ album.año }}</p>
                    </b-card-body>
                  </b-card>
                </b-card-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-row><h4>Canciones Mas Populares</h4> </b-row>

            <b-list-group>
              <b-list-group-item v-for="(track, i) in songs" :key="i">
                <b-avatar :src="track.imagen"></b-avatar>
                <span> {{ track.titulo }} - {{ track.album }}</span>
                <span>{{`Tiempo de la cancion ${minutos(track.duracion)}`  }}</span>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("artista", this.$route.params.artistId);
  },
  mounted() {
    this.$store.dispatch("artistasRelacionados", this.$route.params.artistId);
    this.$store.dispatch("albumsArtistas", this.$route.params.artistId);
    this.$store.dispatch("mejoresCanciones", this.$route.params.artistId);
  },
  computed: {
    ...mapState(["infoBasica", "releated", "albums", "songs"]),
    
  },
  filters:{
    formatNumber(value){
      let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  },
  methods:{
    minutos(duracion) {
     let milliseconds = parseInt((duracion % 1000) / 100),
    seconds = Math.floor((duracion / 1000) % 60),
    minutes = Math.floor((duracion / (1000 * 60)) % 60),
    hours = Math.floor((duracion / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return minutes + ":" + seconds + "." + milliseconds;
    
    },
    joinGenero(item) {
      if(item) return item.join(', ');
      return item;
    }
  }
};
</script>

<style>
.avatar {
  width: 300px;
  height: 300px;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  background-color: #212529;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>