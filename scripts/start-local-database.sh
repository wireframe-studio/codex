#! /bin/bash

docker run --name codex-database -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=codex -p 5432:5432 -d postgres