export { Application, etag, Router } from 'https://deno.land/x/oak/mod.ts'
import chalkin                       from 'https://deno.land/x/chalkin/mod.ts'
export { MongoClient, Bson }         from 'https://deno.land/x/mongo@v0.31.0/mod.ts'
import Logger                        from 'https://deno.land/x/logger@v1.0.2/logger.ts'

// @deno-types="https://denopkg.com/soremwar/deno_types/react/v16.13.1/react.d.ts"
import React    from 'https://jspm.dev/react@16.13.1'
// @deno-types="https://denopkg.com/soremwar/deno_types/react-dom/v16.13.1/react-dom.d.ts"
import ReactDOM from 'https://jspm.dev/react-dom@17.0.2'
export {
  BrowserRouter,
  Link,
  Switch,
  Route,
  StaticRouter,
  useParams,
  useLocation
} from 'https://jspm.dev/react-router-dom@5.2.0'

// @deno-types="https://denopkg.com/soremwar/deno_types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from 'https://jspm.dev/react-dom@17.0.2/server'

export {
  chalkin, Logger,
  React, ReactDOMServer, ReactDOM
}