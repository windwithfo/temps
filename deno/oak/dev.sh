#!/bin/zsh
deno run --watch --allow-net --allow-read --allow-write --allow-env src/server.ts --env dev -p 8000
