import subprocess
import argparse


def docker_compose_cli():

    parser = argparse.ArgumentParser(description='Docker Compose CLI')
    parser.add_argument('-b', '--build', nargs='+',
                        help='Build a container')
    parser.add_argument('-d', '--dev', nargs='+',
                        help='Run a development environment')
    parser.add_argument('-p', '--prod', nargs='+',
                        help='Run a production environment')
    args = parser.parse_args()

    if args.dev:
        if args.build:
            print('Building container: {}'.format(args.build))
            subprocess.call(
                ['docker-compose', '-f', './docker-compose.dev.yml', 'build', args.build])
        print('Running development environment: {}'.format(args.dev))
        subprocess.call(['docker-compose', 'up', '-d', args.dev])
    elif args.prod:
        if args.build:
            print('Building container: {}'.format(args.build))
            subprocess.call(
                ['docker-compose', '-f', './docker-compose.yml', 'build', args.build])
        print('Running production environment: {}'.format(args.prod))
        subprocess.call(['docker-compose', 'up', '-d', args.prod])

    else:
        print('No arguments provided')


if __name__ == "__main__":
    docker_compose_cli()
