#!/bin/bash

# Name of the Docker image
IMAGE_NAME="tts-api2"

# Build the Docker image
echo "Building Docker image named $IMAGE_NAME..."
docker build -t $IMAGE_NAME .

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Successfully built $IMAGE_NAME."
else
    echo "Failed to build $IMAGE_NAME."
    exit 1
fi

# Run the Docker container
echo "Running Docker container from image $IMAGE_NAME..."
docker run -p 5000:5000 $IMAGE_NAME
