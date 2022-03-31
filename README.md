# dogeX

## this repositery contains all the code for the dogeX project. This includes but is not limited to:

##### main projects

    - backend
    - frontend
    - solidity contracts

#### secondary projects

* bots
  * buybot

- misc
  - pfp generator

<!-- # this is a simple tool to help developers run code locally
# it will run the code in the current directory.
# 'python manage.py run' is the command to launch services ["bot", "frontend", "backend"]

def main():
    import sys
    import subprocess
    from os.path import join, dirname, realpath

    if len(sys.argv) < 3:
        print("Usage: python manage.py run [service]")
        print("Services: bot, frontend, backend")
        return

    dirn = dirname(realpath(__file__))

    service = sys.argv[2]
    if service == "bot":
        # ask for anothe argument (the subservice)
        if len(sys.argv) < 4:
            print("Usage: python manage.py run bot [subservice]")
            print("Subservices: buybot")
            return

        subservice = sys.argv[3]
        subprocess.run(
            ["bash", f"{dirn}/bots/{subservice}/startdev.sh"],
            cwd=f"{dirn}/bots/{subservice}")
    elif service == "frontend":
        subprocess.run(["python", "frontend.py"])
    elif service == "backend":
        subprocess.run(["python", "backend.py"])
    else:
        print("Unknown service: {}".format(service)) -->
<!-- explain this in markdown -->
### manage.py

the manage.py file is the main entry point for the project. it has yet to be improved but it works this way:

'python manage.py run [service]' is the command to launch services ["bot", "frontend", "backend"]

some commands are filtered by their subservice:
  - 'python manage.py run bot [subservice]' is the command to launch the bots (buybot)

The idea to create this is to simplify onoboarding of new freelancers on the project.

### each subprojects has their own README.md, read them if assigned a task on it.
### the KOCHI is using many different technologies, please don't modify anything in the subprojects you are not assigned in.