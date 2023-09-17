билдим образ в каталоге(точка последним параметром обязательна)
docker build -t imagename:tag .
(в моём случае docker build -t frontend:latest .)

тегаем название для удалённого репозитория
docker tag frontend:latest hakon051/tl121pet.front:latest

публикуем
docker push hakon051/tl121pet.front:latest