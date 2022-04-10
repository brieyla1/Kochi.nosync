# Kochi, formerly DogeX

## this repositery contains all the code for the dogeX project. This includes but is not limited to:

##### main projects

    - backend
    - frontend
    - solidity contracts

##### secondary projects

- bots
  - buybot

### docker-compose

using dockercompose is the easiest way to get started.

make sure you have docker running, then run

* Step 1:  `docker-compose --file docker-compose.dev.yml up --build`
* Step 2: Success

you can now edit both the `frontend & backend`, everything will update automatically. the docker container also launched a `mongo database`

### manage.py

the manage.py file is the main entry point for the project. it has yet to be improved but it works this way:

'python manage.py run [service]' is the command to launch services ["bot", "frontend", "backend"]

some commands are filtered by their subservice:

- 'python manage.py run bot [subservice]' is the command to launch the bots (buybot)

The idea is to simplify onoboarding of new people onto the project. the manage.py uses the docker-compose stated above.

### each subprojects has their own README.md, read them if assigned a task on it.

### the KOCHI is using many different technologies, please don't modify anything in the subprojects you are not assigned in.
