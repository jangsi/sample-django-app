## tested on mac osx and Docker Desktop for Mac (2.1.0.1)

## run docker-compose
`docker-compose up --build`

## create admin user inside container
`docker exec -it app-sumo_backend_1 python3 manage.py createsuperuser`