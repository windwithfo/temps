#!/bin/zsh
deno run --allow-net --allow-read --allow-write --allow-env src/server.ts --env test -p 8000
