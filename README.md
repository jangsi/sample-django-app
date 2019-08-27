## Sample react + django + postgres app
tested on mac osx and Docker Desktop for Mac(2.1.0.1)  
This app consists of 3 layers: a UI written in React, an API written with Django, and Postgres as the database  

## run the project
run docker compose:  
`docker-compose up --build`  

create admin user inside django container:  
`docker exec -it app-sumo_backend_1 python3 manage.py createsuperuser`  

## using the app
http://localhost:8000/admin will take you to the admin dashboard. Use the login created in the previous step to create questions and choices  

http://localhost:3000 will take you to the survey app  

## running the apps individually
to run the react app:  
`cd survey-react`  
`yarn && yarn start`  

to run the django app:  
You must update the settings.py `DATABASES` entry and `HOST` should be `localhost` and run `postgres` separately  
`cd survey-api`  
`python manage.py runserver`  

## testing
to test the react app:  
`cd survey-react`  
`yarn test`  

to test the django app:  
You must update the settings.py `DATABASES` entry and `HOST` should be `localhost`  
`cd survey-api`  
`python3 manage.py test survey`  


