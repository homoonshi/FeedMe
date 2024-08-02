# Jenkins 빌드 스크립트 예제

# Docker 빌드 전에 인증서 파일을 Jenkins 작업 디렉토리로 복사
mkdir -p ./certs
cp /home/ubuntu/project/certbot/etc/letsencrypt/live/i11b104.p.ssafy.io/fullchain.pem ./certs/
cp /home/ubuntu/project/certbot/etc/letsencrypt/live/i11b104.p.ssafy.io/privkey.pem ./certs/

# Docker 이미지 빌드
echo docker image build
docker build -t doki2580/feedme-front:latest -f ./Front-feedme/Dockerfile ./Front-feedme

# Docker 이미지 푸시
echo docker image push
docker push doki2580/feedme-front:latest

# 기존 도커 이미지 삭제를 위한 준비
echo Checking for dangling images
no_tag_image_ids=$(docker images -f "dangling=true" -q)

if [ -z "$no_tag_image_ids" ]; then
  echo "No dangling images to remove."
else
  echo "Removing dangling images"

  # 각 이미지 ID에 대해 순회하며 삭제하기 전에 해당 이미지의 컨테이너를 먼저 중지하고 삭제
  for image_id in $no_tag_image_ids; do
    # 해당 이미지 ID를 사용하는 컨테이너 중지 및 삭제
    container_ids=$(docker ps -a -q --filter "ancestor=$image_id")
    if [ -n "$container_ids" ]; then
      for container_id in $container_ids; do
        docker stop $container_id
        docker rm $container_id
      done
    fi
    
    # 이미지 삭제
    docker rmi $image_id
    echo "Deleted image $image_id"
  done
fi
