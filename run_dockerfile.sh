ARG0=$1
shift

# if ARG0 is not empty
echo "Info: Building image from Dockerfile.${ARG0}, please wait..."
if [ -n "$ARG0" ]; then
  # assign the return $(docker build -q --file docker/Dockerfile.arg0 .) to the variable $IMAGE_ID
  IMAGE_ID=$(docker build -q --file docker/Dockerfile.$ARG0 .)
  echo "Info: Finished building image from Dockerfile.${ARG0}"

  # if IMAGE_ID is not empty
  if [ -n "$IMAGE_ID" ]; then
    # run the docker image
    docker run $@ -it $IMAGE_ID
  else
    echo "Error: No such image: '$IMAGE_ID'"
  fi
else
  echo "Error: please specify the dockerfile to run as an argument. e.g. ./run_dockerfile.sh avatars"
fi
