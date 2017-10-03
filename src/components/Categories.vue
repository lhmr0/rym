<template>
    <div class="center">
        
        <h1 class="title is-1">Categories</h1>


     <div class="container is-fullhd is-centered"> 

     <a class="button is-primary" @click="mensaje('Q188473')">  
        <span class="icon">
          <i class="fa fa-film"></i>
        </span>
        <span>Accion</span>
     </a>
     <a class="button is-primary" @click="mensaje('Q319221')">  
        <span class="icon">
          <i class="fa fa-film"></i>
        </span>
        <span>Aventura</span>
     </a>
     <a class="button is-primary" @click="mensaje('Q202866')">  
        <span class="icon">
          <i class="fa fa-film"></i>
        </span>
        <span>Animación</span>
     </a>
     <a class="button is-primary" @click="mensaje('Q157443')">  
        <span class="icon">
          <i class="fa fa-film"></i>
        </span>
        <span>Comedia</span>
     </a>
    <br><br>       
    <a class="button is-primary" @click="mensaje('Q93204')">  
        <span class="icon">
          <i class="fa fa-film"></i>
        </span>
        <span>Documental</span>
     </a>
    <a class="button is-primary" @click="mensaje('Q130232')">  
        <span class="icon">
          <i class="fa fa-film"></i>
        </span>
        <span>Drama</span>
     </a>
     <a class="button is-primary" @click="mensaje('Q1361932')">  
        <span class="icon">
          <i class="fa fa-film"></i>
        </span>
        <span>Familia</span>
     </a>
    <br><br>  
    <a class="button is-primary" @click="mensaje('Q157394')">  
        <span class="icon">
          <i class="fa fa-film"></i>
        </span>
        <span>Fantasía</span>
     </a> 
    <a class="button is-primary" @click="mensaje('Q200092')">  
        <span class="icon">
          <i class="fa fa-film"></i>
        </span>
        <span>Terror</span>
     </a>
    <a class="button is-primary" @click="mensaje('Q842256')">  
        <span class="icon">
          <i class="fa fa-film"></i>
        </span>
        <span>Música</span>
     </a>
    <br><br>  
    <a class="button is-primary" @click="mensaje('Q1200678')">  
        <span class="icon">
          <i class="fa fa-film"></i>
        </span>
        <span>Misterio</span>
     </a>
     <a class="button is-primary" @click="mensaje('Q1054574')">  
        <span class="icon">
          <i class="fa fa-film"></i>
        </span>
        <span>Romance</span>
     </a>
     <a class="button is-primary" @click="mensaje('Q471839')">  
        <span class="icon">
          <i class="fa fa-film"></i>
        </span>
        <span>Ciencia Ficción</span>
     </a>    
     <br><br>  
     <a class="button is-primary" @click="mensaje('Q19367312')">  
        <span class="icon">
          <i class="fa fa-film"></i>
        </span>
        <span>Suspenso</span>
     </a>
     <a class="button is-primary" @click="mensaje('Q369747')">  
        <span class="icon">
          <i class="fa fa-film"></i>
        </span>
        <span>Guerra</span>
     </a>
     <a class="button is-primary" @click="mensaje('Q172980')">  
        <span class="icon">
          <i class="fa fa-film"></i>
        </span>
        <span>Western</span>
     </a>
    </div>  
    </div>


</template>



<script>
import axios from 'axios'
export default {
    created(){
        window.document.title="Categories";
    },
  data() {
    return {
      data: [],
    }
  },

  methods: {
    mensaje(dato){
          this.$router.push('/categories/'+dato);
        }
  },
  }

</script>

<style>
    .center{
        text-align: center;
    }

    .altura{
        height: 400px;
    }
</style>
