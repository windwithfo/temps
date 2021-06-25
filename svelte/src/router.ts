import Index from './views/Index.svelte'
import NotFound from './views/NotFound.svelte'
import Test from './views/Test.svelte'

const routes = {
  // Exact path
  '/': Index,

  // Using named parameters, with last being optional
  '/index': Index,

  // Wildcard parameter
  '/test': Test,

  // Catch-all
  // This is optional, but if present it must be the last
  '*': NotFound,
}

export default routes
