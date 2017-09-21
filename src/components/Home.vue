<template>
  <section>
    <div class="container is-fullhd fondo" >
    <center>
      <br><br><br><br><br><br><br>
      <h4 class="subtitle is-4 blanco">Welcome!</h4>
      <h1 class="title is-1 blanco">SEARCH AND RATE</h1>  
       <h1 class="subtitle is-1 blanco">A MOVIE EASILY!</h1>
     </center>
     <br>

    
     
    
      <div class="column ">
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

     <nav class="container is-mobile">     
     <h4 class="subtitle is-4"><center>Proudly done with PHP! (?)</center></h4>
      <br><div class="level-item has-text-centered">
        <img src="http://lhmr.tech/content/images/2016/10/darth.png" alt="Rate your movie!"  width="150" height="160">
      </div>
    </nav>
    
</section>




   
 


</template>


<script>
  //importamos axios
  import axios from 'axios'
  import debounce from 'lodash/debounce'

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
        getAsyncData: debounce(function() {
          this.data = []
          this.isFetching = true


          axios.get(`https://query.wikidata.org/sparql?format=json&query=SELECT ?movie ?movieLabel  ?movieDuration ?image WHERE {
  ?movie wdt:P31 wd:Q11424.
  ?movie rdfs:label ?movieLabel.
   
  OPTIONAL { ?movie wdt:P18 ?image.}
  OPTIONAL { ?movie wdt:P2047 ?movieDuration.}
 
  FILTER(LANGMATCHES(LANG(?movieLabel), "es"))
  FILTER(REGEX(STR(?movieLabel), "${this.name}"))
}`)
            .then(({
              data
            }) => {
              data.results.bindings.forEach((item) => this.data.push(item))
              this.isFetching = false
              console.log(data)
            }, response => {
              this.isFetching = false
              console.log(data)
            })
        }, 500),

        mensaje(dato){
          console.log(dato)
          var parts = dato.split('/');
          var answer = parts[parts.length - 1];
          this.$router.push('/movies/'+answer)
        }
      }
  }

</script>


<style>
.fondo{
color:#fff;
background-image:url(https://luishmr0.github.io/semanticmovies/img/bg.jpg);
background-repeat:no-repeat;
background-attachment:scroll;
background-position:center center;
-webkit-background-size:cover;
-moz-background-size:cover;
-o-background-size:cover;
background-size:cover;
width:100%;
height:100%;
}
.blanco{
color:#fff;
font-family:'Kaushan Script','Helvetica Neue',Helvetica,Arial,cursive;
}
</style>
