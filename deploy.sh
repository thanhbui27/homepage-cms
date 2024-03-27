#!/bin/bash

set -e

AWS_ID="662300795781"
AWS_ECR_FOLDER_NAME="cdk-hnb659fds-container-assets-662300795781-ap-southeast-1"
AWS_PROFILE="$1"
TASK_FAMILY="SpaCmsProductionStackBackendTaskDefinitionF39855CF"

ECS_CLUSTER_NAME="SpaCmsProductionStack-EcsCluster97242B84-muoU5yTniqeE"
ECS_CLUSTER_SERVICE_NAME="SpaCmsProductionStack-LoadBalancedEcsServiceB6FF0D3F-tCSz5NWkPkxi"

# Login docker
aws ecr get-login-password --region ap-southeast-1 --profile ${AWS_PROFILE} | docker login --username AWS --password-stdin ${AWS_ID}.dkr.ecr.ap-southeast-1.amazonaws.com

epochTime=`date +%s`

docker_name="spa-cms_${epochTime}"

# Docker build
docker build --platform=linux/amd64 -t ${docker_name} $(for i in `cat .env.dev`; do out+="--build-arg $i " ; done; echo $out;out="") .

# Set tag
docker tag ${docker_name} ${AWS_ID}.dkr.ecr.ap-southeast-1.amazonaws.com/${AWS_ECR_FOLDER_NAME}:${docker_name}

# Docker push
docker push ${AWS_ID}.dkr.ecr.ap-southeast-1.amazonaws.com/${AWS_ECR_FOLDER_NAME}:${docker_name}

# Docker remove image
docker image rmi ${docker_name}

NEW_IMAGE="${AWS_ID}.dkr.ecr.ap-southeast-1.amazonaws.com/${AWS_ECR_FOLDER_NAME}:${docker_name}"
# Register a new task definition
TASK_DEFINITION=$(aws ecs describe-task-definition --task-definition "${TASK_FAMILY}" --region "ap-southeast-1" --profile ${AWS_PROFILE} )
NEW_TASK_DEFINITION=$(echo $TASK_DEFINITION | jq --args ".taskDefinition" | jq --args "del(.taskDefinitionArn)" | jq --args "del(.revision)" | jq --args "del(.status)" | jq --args "del(.requiresAttributes)" | jq --args "del(.registeredAt)" | jq --args "del(.registeredBy)" | jq --args "del(.compatibilities)" | jq --args "(.containerDefinitions[].image)=\"${NEW_IMAGE}\"")

aws ecs register-task-definition --region "ap-southeast-1" --cli-input-json "${NEW_TASK_DEFINITION}" --profile ${AWS_PROFILE}

# Update to the cluster
aws ecs update-service --cluster $ECS_CLUSTER_NAME --region "ap-southeast-1" --service $ECS_CLUSTER_SERVICE_NAME --task-definition $TASK_FAMILY --profile ${AWS_PROFILE}

echo "DEPLOYED !!!!"
