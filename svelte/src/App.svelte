<script lang="ts">
  import { link } from 'svelte-spa-router'
  import active from 'svelte-spa-router/active'
  import Router from 'svelte-spa-router'
  import routes from './router'
</script>

<body>
  <a href="/index" use:link use:active>index</a>
  <a href="/test" use:link use:active>test</a>
  <a href="/test2" use:link use:active>test2</a>
  <Router {routes} />
</body>

<style>
  :global(a.active) {
    color: red;
  }
</style>
