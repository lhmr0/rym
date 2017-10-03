<template>
  <div class="container is-mobile">
    <div class="column">
      <center>
        <h1 class="title is-1">Categoria - {{this.nombre}} </h1>

        
      </center>
    </div>
    <center>      
      
    </center>
    <h1 class="title is-4"  >Peliculas </h1>
    <p v-for="nom in this.data">
    <a @click="mensaje(nom.movie.value)">{{nom.movieLabel.value}} </a>                
    </p><br>     </h1>
   
      </div>
  

  </div>
</template>


<script>
import axios from 'axios'
export default {
  mounted() {
    this.geturl();  
    this.getname();
    window.document.title = this.id + " - RYM!"
  },
  data() {
    return {
      id: this.$route.params.id,
      data: [],
      nombre:"",
      isOpen: false
    }
  },

  methods: {
    geturl() {
      axios.get(`https://query.wikidata.org/sparql?format=json&query=SELECT ?movie ?movieLabel   WHERE {
    ?movie wdt:P31 wd:Q11424.
    ?movie rdfs:label ?movieLabel.
    ?movie wdt:P136 wd:${this.id}.
   
    FILTER(LANGMATCHES(LANG(?movieLabel), "es"))
  }
LIMIT 50`).then((response) => {
          this.loading = false;
          const results = response.data.results.bindings;
          this.data = results;
         ;
        });
    },
    getname() {
      axios.get(`https://query.wikidata.org/sparql?format=json&query=SELECT DISTINCT ?genre WHERE {
    wd:${this.id} rdfs:label ?genre.
  FILTER(LANGMATCHES(LANG(?genre), "es"))   
  }
LIMIT 1`).then((response) => {
          this.nombre = response.data.results.bindings[0].genre.value;
          
         ;
        });
    },
     mensaje(dato){
          var parts = dato.split('/');
          var answer = parts[parts.length - 1];
          this.$router.push('/movies/'+answer);
        }
  }
  }
</script>

<style>
</style>
