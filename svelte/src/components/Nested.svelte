<script lang="ts">
  export let text = { foo: { bar: 'defalut' } }
  text.foo.bar = 'dks'
</script>

<p>anothor text {text.foo.bar}</p>

<style>
  p {
    color: purple;
    font-family: 'Comic Sans MS', cursive;
    font-size: 2em;
  }
</style>