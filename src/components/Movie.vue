<template>
  <div class="container is-mobile">    
<section class="hero">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
      <center> {{movie.movieLabel }}</center>
     <center> <h1 v-if="loading">Cargando...{{this.mensaje}}</h1></center>
        <center> <h1 ></h1></center>
      </h1>
      </div>
  </div>

</section>
<br>
      <h2 class="subtitle">
       <center> <img :src="uri" alt=" Rate your movie!" height="350" width="300"></center>
      </h2>
      <center> <a :href="netflix" > <img src="https://orig00.deviantart.net/2074/f/2016/352/e/b/netflix_honeycomb_icon_by_roxor470-das00oc.png" alt=" Rate your movie!" height="50" width="50"></a> 
        </center>

   <div class="tile is-ancestor">
  <div class="tile is-vertical is-8">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child notification">
         <p class="title">Director(es):</p>
          <p v-for="nom in movie.crew">
            {{nom}}
          </p>
        </article>
        <article class="tile is-child notification">
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
        <article class="tile is-child notification">
          <center>
            <youtube :video-id="videoId" player-width="300" player-height="350"></youtube>
          </center>
        </article>
      </div>
    </div>
  </div>
  <div class="tile is-parent">
    <article class="tile is-child notification">
     <p class="title">Detalles:</p>
         <p>Productora(s):</p>
          <p v-for="nom in movie.producers">
            {{nom}}
          </p>
          <p>Duración: {{movie.movieDuration}} minutos</p>
         
          <p>Género(s): </p>
          <p v-for="nom in movie.genre">
            {{nom}}
          </p>
    </article>
  </div>
</div>


<div class="tile is-parent">
      <article class="tile is-child notification">
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
          <b-field label="Author">
           <b-input placeholder="Author..."
                type="search"
                icon-pack="fa"
                icon="user"
                v-model="comentario.aut"
                required>
            </b-input>
            </b-field>
          </div>
          
        
          <div class="field">
            <p class="control">  
            <b-field label="Comment">  
            </b-field>          
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
  titulo: "",
  mensaje: "",
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
    window.document.title = "RYM!";    
    
  },  
  beforeUpdate() {   
     this.getYoutube();
    window.document.title = this.titulo + " - RYM!";  

  },
  updated() {  

    setTimeout(this.existe, 9000);
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
  wd:${this.id} wdt:P161 ?miembro_del_reparto. 
  ?miembro_del_reparto rdfs:label ?reparto.
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
          console.log("hola");
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
          this.movie.name = Object.keys(groupBy(results, 'movieLabel'));
          this.titulo = this.movie.name[0];
        });

    },
    getYoutube(){
      axios.get(`https://www.googleapis.com/youtube/v3/search?part=id&q=${this.titulo} trailer&type=video&key=AIzaSyAHyQ-GlNMGVxECRjRyInBDNJS-pf7biVQ`).then((response) => {       
          this.loading = false;
           const results = response.data.items;           
           if (typeof(this.titulo) == 'undefined'){
            this.videoId = "W6CjO0H2j0s";
           }else{
            this.videoId = results[0].id.videoId;
           }
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
    },
    existe() {     
     if (typeof(this.titulo) == 'undefined') {
      console.log("no existe");
      console.log(this.movie)
      this.mensaje = "Error con wikidata";
      window.document.title = this.mensaje + " - RYM!";  
      }
    },
     
  },

  computed: {
    uri() {
      try {
        return this.movie.image;
      } catch (error) {
        return "http://lacosacine.com/www/resize/aHR0cDovL3NpdGUubGFjb3NhY2luZS5jb20vaW1nL2dhbGVyaWEvMjI3MGQ3IC0gQ1VBTlRBUyBWRUNFUyBQT1IgQcOD4oCYTyBWQU1PUyBBTCBDSU5FLmpwZw==/80/220/"
      }  
    },
     netflix() {     
       return "https://netflix.com/watch/"+this.movie.identificador_Netflix;     
    },
  }
}
</script>

<style>
.blanco {
    color:white;
  }
</style>
