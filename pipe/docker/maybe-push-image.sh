# why?: only build and push a docker image if it changed!

FOLDERPATH="pipe/docker"
FILEPATH="${FOLDERPATH}/Dockerfile"

# trigger:
if git diff --name-only HEAD HEAD~1 | grep -q ${FILEPATH}; then
    echo "${FILEPATH} CHANGED !"
    # payload:
    echo "BUILD AND PUSH DOCKER IMAGE"
    cd $BITBUCKET_CLONE_DIR/$FOLDERPATH
    VERSION="0.$BITBUCKET_BUILD_NUMBER"
    echo ${DOCKER_PASS} | docker login --username "$DOCKER_USER" --password-stdin
    IMAGE="$DOCKER_USER/$DOCKER_REPO"
    docker build -t ${IMAGE} .
    docker image ls
    docker push ${IMAGE}
# no-trigger
else
    echo "${FILEPATH} UNCHANGED !"
fi