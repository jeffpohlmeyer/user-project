# user-project
A simple project that integrates a Django/Django REST Framework backend with a Vue frontend.  This simply has all user functionality set up via django-rest-auth

# FrontEnd
```
cd frontend/user_project
npm install
npm run serve
```
More detail about the Vue project can be found in [frontend/user_project/README.md](frontend/user_project/README.md)

# BackEnd
```
cd user-project/backend
pipenv install
pipenv run python manage.py make migrations
pipenv run python manage.py migrate
pipenv run python manage.py createsuperuser
pipenv run python manage.py runserver
```
