билдим образ в каталоге(точка последним параметром обязательна)
docker build -t imagename:tag .
(в моём случае docker build -t frontend:0.1.8.1 .)
(в моём случае docker build -t frontend:latest .)

(в моём случае docker build -t backend:0.1.8.1 .)
(в моём случае docker build -t backend:latest .)

тегаем название для удалённого репозитория
docker tag frontend:latest hakon051/tl121pet.front:latest
docker tag frontend:0.1.8.1 hakon051/tl121pet.front:0.1.8.1

docker tag backend:0.1.8.1 hakon051/tl121pet:0.1.8.1
docker tag backend:latest hakon051/tl121pet:latest

публикуем
docker push hakon051/tl121pet.front:0.1.8.1
docker push hakon051/tl121pet.front:latest

docker push hakon051/tl121pet:0.1.8.1
docker push hakon051/tl121pet:latest