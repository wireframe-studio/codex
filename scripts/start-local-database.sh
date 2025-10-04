#! /bin/bash

brew services start postgresql
createdb mfucek
psql
createuser -S dev
psql > \password dev > dev
# postgresql://dev:dev@localhost:5432/codex