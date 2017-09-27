<template>
  <div class="container is-mobile">
    <div class="column">
      <center>
        <h1 class="title is-1">{{movie.movieLabel }}</h1>
        <h1 v-if="loading">Cargando...</h1>
      </center>
    </div>

    <center>
      <img :src="uri" alt=" Rate your movie!" height="350" width="300">
      <img :src="uri" alt=" Rate your movie!" height="350" width="300">
      <p>
        <b>Average Rating : {{movie.vote_average}}/10</b>
      </p>

    </center>

    <div class="tile is-ancestor">
      <div class="tile is-4 is-vertical is-parent">
        <div class="tile is-child box">
          <p class="title">Director(es):</p>
          <p v-for="nom in movie.crew">
            {{nom}}
          </p>
        </div>
        <div class="tile is-child box">
          <p class="title">Reparto:</p>
          <b-panel header="Abrir/Cerrar" has-custom-template collapsible :open.sync="isOpen">
            <div class="panel-block">
              <div class="content">
                <p v-for="nom in movie.repart">
                  {{nom}}
                </p>
              </div>
            </div>
          </b-panel>
        </div>
        <div class="tile is-child box">
          <center>
            <youtube :video-id="videoId" player-width="320" player-height="100" :player-vars="{ autoplay: 1 }"></youtube>
          </center>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child box">
          <p class="title">+ detalles: </p>
          <p>Productoras:</p>
          <p v-for="nom in movie.producers">
            {{nom}}
          </p><br>
          <p>Duración: {{movie.movieDuration }}</p><br>
          <p>Género(s): </p>
          <p v-for="nom in movie.genre">
            {{nom}}
          </p><br>
        </div>
      </div>
    </div>

    <br><br><br>
    <form @submit.prevent="enviar">
      <article class="media">
        <figure class="media-left">
              <p class="image is-64x64">
                <img src="http://bulma.io/images/placeholders/128x128.png">
              </p>
            </figure>

        <div class="media-content">
         

          <div class="field">
            <p class="control">
              <textarea required class="textarea" placeholder="Add a comment..." v-model="comentario.msj"></textarea>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <!-- <button class="button is-dark">Post comment</button> -->
              <input type="submit" value="Send Comment" class="button is-dark">

            </p>
          </div>
          <br/>
        </div>

      </article>
    </form>
    <!-- <pre>{{$data}}</pre> -->
  </div>
</template>


<script>
import axios from 'axios'
export default {
  props: ['id'],
  data() {
    return {
      loading: false,
      newlink: "",
      movie: {},
      isOpen: false,
      videoId: 'W6CjO0H2j0s',
      //Modelo
      comentario: {
        id:this.id,
        msj: null,

      }

    }
  },
  created() {
    this.geturl();
  },
  mounted() {
    window.document.title = this.id + " - RYM!"
  },
  methods: {
    mapWikidata(data) {
      return data.map(function(m) {
        const obj = {};
        for (var key in m) {
          if (Object.prototype.hasOwnProperty.call(m, key)) {
            obj[key] = m[key].value;
          }
        }
        return obj;
      });
    },
    geturl() {
      this.loading = true;
      axios.get(`
   https://query.wikidata.org/sparql?format=json&query=SELECT DISTINCT ?nom_productora ?image ?movieLabel  ?genre ?identificador_Netflix ?nombre_director ?reparto ?movieDuration WHERE {
  wd:${this.id} rdfs:label ?movieLabel.
  ?miembro_del_reparto rdfs:label ?reparto.
  wd:${this.id} wdt:P161 ?miembro_del_reparto. 
  OPTIONAL { wd:${this.id}  wdt:P136 ?movieGenre. }
  OPTIONAL { ?movieGenre rdfs:label ?genre. }
  OPTIONAL { wd:${this.id}  wdt:P1874 ?identificador_Netflix. }
  OPTIONAL { wd:${this.id}  wdt:P57 ?director. }
  OPTIONAL { ?director rdfs:label ?nombre_director. }  
  OPTIONAL { wd:${this.id}  wdt:P18 ?image. }
  OPTIONAL { wd:${this.id}  wdt:P272 ?productora. }
  OPTIONAL { wd:${this.id} wdt:P2047 ?movieDuration.}
  OPTIONAL { ?productora rdfs:label ?nom_productora. }
  FILTER(LANGMATCHES(LANG(?movieLabel), "es"))
  FILTER(LANGMATCHES(LANG(?genre), "es"))
  FILTER(LANGMATCHES(LANG(?reparto), "es"))
  FILTER(LANGMATCHES(LANG(?nombre_director), "es"))
  FILTER(LANGMATCHES(LANG(?nom_productora), "es"))
}

       `)
        .then((response) => {
          const self = this;
          this.loading = false;
          const results = self.mapWikidata(response.data.results.bindings);
          this.movie = results[0];
          // this.link = this.data.image.value
          var groupBy = function(xs, key) {
            return xs.reduce(function(rv, x) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, {});
          };
          this.movie.crew = Object.keys(groupBy(results, 'nombre_director'));
          this.movie.repart = Object.keys(groupBy(results, 'reparto'));
          this.movie.genre = Object.keys(groupBy(results, 'genre'));
          this.movie.producers = Object.keys(groupBy(results, 'nom_productora'));
        });
    },
    enviar() {
      for (let key in this.comentario) {
        console.info(`${key} : ${this.comentario[key]}`)
      }
      this.comentario.msj=null
    }
     
  },

  computed: {

    uri() {
      try {
        return this.movie.image;
      } catch (error) {
        return "http://lacosacine.com/www/resize/aHR0cDovL3NpdGUubGFjb3NhY2luZS5jb20vaW1nL2dhbGVyaWEvMjI3MGQ3IC0gQ1VBTlRBUyBWRUNFUyBQT1IgQcOD4oCYTyBWQU1PUyBBTCBDSU5FLmpwZw==/80/220/"
      }

    },
  }
}
</script>

<style>

</style>
