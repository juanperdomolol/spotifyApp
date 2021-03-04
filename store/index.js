export const state = () => ({
  songs: [],
  albums:[],
  dataItem: [],
  artist: false,
  song: false,
  token: "No token",
  infoBasica: [],
  releated: []
});

export const mutations = {
    CancionesArtistas(state,payload){
      state.songs = payload
    },

  getAlbumsArtist(state,payload){
    state.albums = payload
  },
  getReleated(state,payload){
    state.releated = payload
  },
  getInfoArtista(state,payload){
    state.infoBasica = payload
    state.artist = true
    state.song = true

  },
  // setToken(state, payload) {
  //   state.token = payload;
   
  // },
  setReleases(state, payload) {
    state.dataItem = payload;
  },
  getSong(state,payload){
    state.dataItem = payload
    state.song = true
  },
  getArtist(state,payload){
    state.dataItem = payload
    state.artist = true
  },
  token(state, payload) {
    state.token = payload;
    localStorage.setItem("tokenGuardado",payload)
  },
  cargarToken(state,payload){
    state.token= localStorage.getItem("tokenGuardado")
  }
};
export const actions = {
  async getToken({ commit, dispatch }) {
      try {
        const tokenDTO = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `grant_type=client_credentials&client_id=${process.env.client_id}&client_secret=${process.env.client_secret}`
            });
        const data = await tokenDTO.json();
        commit("token", data.access_token);
        
      } catch (error) {
          console.warn(error.message)
      } finally {
        dispatch('getReleases')
      }
  },
  async getReleases({ commit }) {
    const response = await this.$axios({
      method: "get",
      url: "https://api.spotify.com/v1/browse/new-releases",
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    });
    let data = response.data.albums.items.map(item => {
      return {
        id: item.id,
        artistaId: item.artists[0].id,
        images: item.images.length
          ? item.images[0].url
          : "https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png",
        nombre: item.name,
        artistas: item.artists[0].name,
        title: "Nuevas Tendecias"
      };
    });
    return commit("setReleases", data);
  },
  async getArtista({commit,dispatch}, texto){
    try {
      if (texto != ""){
        const responseArtist = await this.$axios({
          method: "get",
          url: `https://api.spotify.com/v1/search?q=${texto}&type=artist`,
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        console.log(responseArtist.data.artists.items)
        let data = responseArtist.data.artists.items.map(item=>{
          return{
            artistaId: item.id,
            images: item.images.length ? item.images[0].url : "https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png",
            nombre: item.name,
            title: "Artistas Encontrados"
          }
        })
        return commit("getArtist",data)
      }
      else{
        dispatch('getReleases')
      }
    } catch (error) {
      console.log(error)
    }
   
  
  },
  async getCancion({commit,dispatch},texto){
    try {
      if(texto != ""){
        const responseSong = await this.$axios({
          method: "get",
          url:`https://api.spotify.com/v1/search?q=${texto}&type=track`,
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        console.log(responseSong.data.tracks.items)
        let dataSong = responseSong.data.tracks.items.map(item=>{
          return{
            artistaId: item.artists[0].id,
            images: item.album.images.length ? item.album.images[0].url : "https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png",
            nombre: item.name,
            artistas: item.artists[0].name
          }
        })
        return commit("getSong",dataSong)
      }
     else{
       dispatch('getReleases')
     }
    } catch (error) {
      console.log(error)
    }
   
  },
  async artista({commit}, dataId) {
    commit('cargarToken')
    // console.log(this.state.token)
    const infoArtist = await this.$axios({
      method:"get",
      url: `https://api.spotify.com/v1/artists/${dataId}`,
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    })
    // console.log(infoArtist.data)
    const dataArtist = {
        genero: infoArtist.data.genres,
        seguidores: infoArtist.data.followers.total,
        images: infoArtist.data.images.length ? infoArtist.data.images[0].url : "https://www.farmaciasannicolas.com/Producto/GetMultimediaProducto?idProducto=80e0905e-5a3f-49c5-8f74-ce42c1ba252a&idMultimedia=e045395e-d0f4-42fa-a310-e8e8bebd8e6e",
        nombre: infoArtist.data.name
      }
    return commit('getInfoArtista',dataArtist)
  },
  async artistasRelacionados({commit},dataId){
    const artisRelated = await this.$axios({
      method: "get",
      url: `https://api.spotify.com/v1/artists/${dataId}/related-artists`,
      headers:{
        Authorization: `Bearer ${this.state.token}`
      }
    })
    const releates = artisRelated.data.artists
    return commit('getReleated',releates)
  },
  async albumsArtistas({commit},dataId){
    const albums = await this.$axios({
      method: "get",
      url: `https://api.spotify.com/v1/artists/${dataId}/albums?limit=9`,
      headers:{
        Authorization: `Bearer ${this.state.token}`
      }
    })
    // console.log(albums.data.items)
    
    let albumsTop = albums.data.items.map(item =>{
        return{
        images: item.images,
        nombre: item.name,
        año: item.release_date
      };
    });
    albumsTop = albumsTop.filter((item, index, self) =>
      index === self.findIndex((element) => (
        element.nombre === item.nombre
      ))
    )
    return commit('getAlbumsArtist',albumsTop)
  },
  async mejoresCanciones({commit},dataId){
    const tracks = await this.$axios({
      method: "get",
      url: `https://api.spotify.com/v1/artists/${dataId}/top-tracks?market=ES`,
      headers:{
        Authorization: `Bearer ${this.state.token}`
      }
    })
    console.log(tracks.data.tracks)
    const bestTracks = tracks.data.tracks.map(item=>{
      return{
        imagen: item.album.images[0].url,
        titulo: item.name,
        album:item.album.name,
        duracion:item.duration_ms
      }
      
    })
    console.log(bestTracks)
    return commit ('CancionesArtistas',bestTracks)
  }
 
};
// export const getters  ={
//     getArtist(){
//         return state.artist
//     }
// }
