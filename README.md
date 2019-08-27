## create shared folder for persistence
`mkdir -p $HOST/docker/volumes/postgres`
## run postgres container
`docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOST/docker/volumes/postgres:/var/lib/postgresql/data postgres`
## test connection to postgres
`psql -h localhost -U postgres -d postgres`
