<template>
  <div class="container center">
    <!-- <pre>{{convertDatos()}}</pre> -->
    <div>
      <h1>{{ validateTitle }}</h1>

      <card
        v-for="(data, i) in dataItem"
        :key="data.id"
        :dataItem="dataItem[i]"
      />
    </div>
  </div>
</template>

<script>
import card from "../components/card.vue";
import { mapState } from "vuex";

export default {
  components: {
    card,
  },
  data() {
    return {
      titutlo: "NUEVAS TENDENCIAS",
    };
  },
  created() {
    this.$store.dispatch("getToken");
  },
  computed: {
    ...mapState(["artist", "song"]),
    dataItem() {
      return this.$store.state.dataItem;
    },
    validateTitle() {
      if (this.song === true) {
        return "Canciones Encontradas";
      } else if (this.artist === true) {
        return "Artistas Encontrados";
      } else {
        return "Nuevas Tendencias";
      }
    },
  },
  methods: {
    // ...mapActions(['getReleases', 'getToken'])
  },
};
</script>

<style>
</style>
