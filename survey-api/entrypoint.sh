#!/bin/sh
/wait-for-it.sh db:5432 --timeout=0 --strict

python3 manage.py makemigrations
python3 manage.py migrate
exec "$@"