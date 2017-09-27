<template>
  <div class="container is-mobile">    
<section class="hero is-dark">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
      <center> {{movie.movieLabel }}</center>
      </h1>
      </div>
  </div>

</section>
      <h2 class="subtitle">
       <center> <img :src="uri" alt=" Rate your movie!" height="350" width="300"></center>
      </h2>

   <div class="tile is-ancestor">
  <div class="tile is-vertical is-8">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child notification is-dark">
         <p class="title">Director(es):</p>
          <p v-for="nom in movie.crew">
            {{nom}}
          </p>
        </article>
        <article class="tile is-child notification is-dark">
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
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-dark">
          <p class="title">Trailer</p>
          <center>
            <youtube :video-id="videoId" player-width="300" player-height="220"></youtube>
          </center>
        </article>
      </div>
    </div>
  </div>
  <div class="tile is-parent">
    <article class="tile is-child notification is-dark">
     <p class="title">Detalles:</p>
         <p>Productoras:</p>
          <p v-for="nom in movie.producers">
            {{nom}}
          </p>
          <p>Duración: {{movie.movieDuration }}</p>
          <p>Género(s): </p>
          <p v-for="nom in movie.genre">
            {{nom}}
          </p>
    </article>
  </div>
</div>


<div class="tile is-parent">
      <article class="tile is-child notification is-dark">
         <div class="content">       
          <p class="title">Comentarios:</p>
          
      </div>
      </article>
    </div>

 
    <div class="tile is-parent" v-for="m in mensajes">
     
       <article class="media">
        <figure class="media-left">
              <p class="image is-64x64">
                <img src="http://bulma.io/images/placeholders/128x128.png">                
              </p>
            </figure>

        <div class="media-content">   
        {{m.author + ":"}}         
          {{m.mensaje}}         
        </div>
      </article>

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
              <input required class="input" placeholder="Add an author" v-model="comentario.aut"></input>
            </p>
          </div>

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
import Firebase from 'firebase';
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
        msj: null,
        aut: null,
      },
      mensaje:null,
      author:null,
      mensajes:[],
    }
  },
  created() {
    this.geturl();
    var db = Firebase.database();
    db.ref(`peliculas/${this.id}`)
    .on('value',snapshot =>this.cargarMensajes(snapshot.val()));
  },
  mounted() {
    window.document.title = this.id + " - RYM!"
  },
  methods: {
    cargarMensajes(mensajes){
      // console.log(mensajes)
      this.mensajes=[]
      for(let key in mensajes){
        this.mensajes.push({
         mensaje:mensajes[key].mensaje,
         author:mensajes[key].author
        })
      }
      console.log(mensajes)
      
    },
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
      var db = Firebase.database();
      for (let key in this.comentario) {
        console.info(`${key} : ${this.comentario[key]}`)
      }

      db.ref(`peliculas/${this.id}`).push({
        mensaje:this.comentario.msj,
        author:this.comentario.aut
      }).then(()=>this.comentario.msj='')
      console.log()
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
