<template>
  <section>
    <section class="hero is-dark is-fullheight">
    <div class="hero-body">
    <div class="container">
      <h1 class="title">
      Welcome
      </h1>
      <h2 class="subtitle">
      SEARCH AND RATE
      </h2>
      <b-autocomplete  v-model="name" :data="data" placeholder="Search a movie title..." icon="search" field="title" :loading="isFetching" @input="getAsyncData" @select="option => selected = option">
          <template scope="props" >
            <div class="media" @click="mensaje(props.option.movie.value)">
              <div class="media-left">
                <img width="32" v-if="props.option.image" :src="`${props.option.image.value}`">
              </div>
              <div class="media-content">
                {{ props.option.movieLabel.value }}
                <br>
                <small v-if="props.option.movieYear && props.option.movieDuration" >
                 Released at {{ props.option.movieYear.value }}, 
                 runtime {{ props.option.movieDuration.value }}</b>
                 </small>
              </div>
            </div>
          </template>
        </b-autocomplete>
    </div>
    </div>
  </section> 
    
</section>




   
 


</template>


<script>
  //importamos axios
  import axios from 'axios'
  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
    };
  })();

  export default {
    created(){
      window.document.title = "Home"
    },
    data() {
        return {
          data: [],
          name: '',
          selected: null,
          isFetching: false
        }
      },
      methods: {
        // You have to install and import debounce to use it,
        // it's not mandatory though.
        getAsyncData(){
        const self = this;
      delay(function() {
        self.data = []
        self.isFetching = true


        axios.get(`https://query.wikidata.org/sparql?format=json&query=SELECT ?movie ?movieLabel  ?movieDuration ?image WHERE {
    ?movie wdt:P31 wd:Q11424.
    ?movie rdfs:label ?movieLabel.
     
    OPTIONAL { ?movie wdt:P18 ?image.}
    OPTIONAL { ?movie wdt:P2047 ?movieDuration.}
   
    FILTER(LANGMATCHES(LANG(?movieLabel), "es"))
    FILTER(REGEX(STR(?movieLabel), "${self.name}"))
  }`)
        .then(({
          data
        }) => {
          data.results.bindings.forEach((item) => self.data.push(item))
          self.isFetching = false
          console.log(data)
        }, response => {
          self.isFetching = false
          console.log(data)
        });
      }, 500);
    },

        mensaje(dato){
          console.log(dato)
          var parts = dato.split('/');
          var answer = parts[parts.length - 1];
          this.$router.push('/movies/'+answer)
        }
      }
  }

</script>


<style scoped>
  .hero {
    background-image:url(https://luishmr0.github.io/semanticmovies/img/bg.jpg);
    background-repeat:no-repeat;
    background-attachment:scroll;
    background-position:center center;
    -webkit-background-size:cover;
    -moz-background-size:cover;
    -o-background-size:cover;
    background-size:cover;    
  }
</style>
