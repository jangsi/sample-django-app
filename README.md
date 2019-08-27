## run docker-compose
`docker-compose up --build`

## create admin user inside container
`docker exec -it app-sumo_backend_1 python3 manage.py createsuperuser`