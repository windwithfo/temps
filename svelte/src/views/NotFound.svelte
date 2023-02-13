<script lang="ts">
  export let params
</script>

<div class="main">
  <p>The path {params.wild} is not found</p>
</div>

<style>
  .main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  p {
    color: purple;
    font-family: 'Comic Sans MS', cursive;
    font-size: 2em;
  }

</style>