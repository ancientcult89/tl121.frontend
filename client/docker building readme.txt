билдим образ в каталоге(точка последним параметром обязательна)
docker build -t imagename:tag .
(в моём случае docker build -t frontend:0.1.7.1 .)
(в моём случае docker build -t frontend:latest .)

тегаем название для удалённого репозитория
docker tag frontend:latest hakon051/tl121pet.front:latest
docker tag frontend:0.1.7.1 hakon051/tl121pet.front:0.1.7.1

публикуем
docker push hakon051/tl121pet.front:0.1.7.1
docker push hakon051/tl121pet.front:latest