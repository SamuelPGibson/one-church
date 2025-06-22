# One Church Backend

* Django API interface
* PostgreSQL database that uses Django Models and ORM
* Strict separation between the API interface and the database - for database flexibility

## PostgreSQL Setup

* Database name: `one_church_db`
* Password is `onechurch`
* Port is `5432`

Check `psql` version

```cmd
psql --version
```

Connect to PostgreSQL

```cmd
psql -U postgres
```

Create database (don't run again)

```cmd
CREATE DATABASE one_church_db;
```

List databases

```cmd
\l
```

Connect to database

```cmd
\c one_church_db
```

## Running the Backend

Create and activate virtual environment

```cmd
cd {virtual environments folder}
python -m venv one_church
cd one_church
Scripts\activate
cd {project backend folder}
```

Apply migrations

```cmd
python manage.py makemigrations
python manage.py migrate
```

Create admin

```cmd
python manage.py createsuperuser
```

Run the development server

```cmd
python manage.py runserver
```

The output should be something like:

```cmd
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
June 22, 2025 - 20:45:23
Django version 4.2, using settings 'church_connect.settings'
Starting development server at http://127.0.0.1:8000/
```
