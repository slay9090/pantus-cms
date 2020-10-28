# Система управления интернет-магазином

- Без использования БД

- API 



![alt text](https://b.radikal.ru/b37/2010/b7/b3c0acd1f5d2.jpg)

![alt text](https://d.radikal.ru/d00/2010/ae/89c8202ed7b0.jpg)

![alt text](https://b.radikal.ru/b25/2010/22/e6f9c2ef6263.jpg)

![alt text](https://b.radikal.ru/b37/2010/b7/b3c0acd1f5d2.jpg)

![alt text](https://c.radikal.ru/c41/2010/27/5034e10d2162.jpg)

![alt text](https://a.radikal.ru/a38/2010/14/714bde2a1632.jpg)

![alt text](https://a.radikal.ru/a39/2010/4c/4e9ed49ade33.jpg)

![alt text](https://b.radikal.ru/b01/2010/e5/a5bc13409380.jpg)

![alt text](https://c.radikal.ru/c33/2010/1c/fa7b9da9fab5.jpg)


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Билд с отключенной вебпак картой
```
vue-cli-service build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Deploy
See [Official vue cli deployment guide](https://cli.vuejs.org/guide/deployment.html#docker-nginx).
```
git clone {prj url}
cd {prj dir}
docker build -t adm-dev ./
docker run -d --name adm-dev -p 8080:80 adm-dev
```
Go to: http://localhost:8080
