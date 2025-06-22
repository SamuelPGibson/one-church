# One Church Backend

* Django API interface
* PostgreSQL database that uses Django Models and ORM
* Strict separation between the API interface and the database - for database flexibility

To run with dummy database, change `db` definition in `backend/api/views.py`

## PostgreSQL Setup (not needed for DummyDatabase configuration)

Download [PostgreSQL](https://www.postgresql.org/download/)

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

Install backend library requirements

```cmd
pip install -r requirements.txt
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

Test API endpoint at http://127.0.0.1:8000/api/test
