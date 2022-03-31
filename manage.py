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

    service = sys.argv[2]
    if service == "bot":
        subprocess.run(["python", "src/bot/main.py"])
    elif service == "frontend":
        subprocess.run(["python", "frontend.py"])
    elif service == "backend":
        subprocess.run(["python", "backend.py"])
    else:
        print("Unknown service: {}".format(service))


if __name__ == "__main__":
    main()
