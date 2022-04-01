# this is a simple tool to help developers run code locally
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
        subprocess.run(["npm", "run", "start"], cwd=f"{dirn}/kochipad")
    elif service == "backend":
        subprocess.run(["npm", "run", "startb:dev"], cwd=f"{dirn}/kochipad")
    elif service == "install":
        subprocess.run(["npm", "install"], cwd=f"{dirn}/kochipad")
    else:
        print("Unknown service: {}".format(service))


if __name__ == "__main__":
    main()
