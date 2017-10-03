<template>
    <section>
    	  <div class="container is-mobile">
<div class="column">
  <center>  <h1 class="title is-1"  >Contact us</h1></center>
</div>
        <div class="field">
  <label class="label">Name</label>
  <div class="control">
    <input class="input" type="text" placeholder="Name...">
  </div>
</div>

<div class="field">
  <label class="label">Email</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input" type="email" placeholder="Email...">
    <span class="icon is-small is-left">
      <i class="fa fa-envelope"></i>
    </span>
  </div>
</div>

<div class="field">
  <label class="label">Message</label>
  <div class="control">
    <textarea class="textarea" placeholder="Message..."></textarea>
  </div>
</div>

<div class="field is-grouped">
  <div class="control">
    <button class="button is-primary">Submit</button>
  </div>
  <div class="control">
    <button class="button is-link">Cancel</button>
  </div>
</div>
         </div>
    </section>
</template>


<script>
export default {
  created(){
    window.document.title = "About"
  }
}
</script>

<style>

</style>
