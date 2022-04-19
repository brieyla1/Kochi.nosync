# Kochi API

Getting Started

## Set up a virtual environment for the project:

```shell
python3 -m venv virtualenv
```

## Activate the environment:

```shell
source virtualenv/bin/activate
```

## Install the dependencies:

`pip install -r requirements.txt`

## Run

```shell
uvicorn src.main:app --host 0.0.0.0 --port 3232 --reload
```

## EXTRA

### auth.py

template for authurization, finilized to accept javascript web token that will expire on the 25th minute. Not in use but can easly be added in the future. Reason : was not desired from the project

### data.py

Contains an object to make it easy to get latest data from the database
Aslo dont requests from database if data has not changed, then it gets from memory

### main.py

All the endpoints for the api
