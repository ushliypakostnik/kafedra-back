FROM node:lts-alpine

WORKDIR /projects/github/express-auth

COPY package*.json ./

# install dependencies
RUN npm install

COPY . .

EXPOSE 8082

# for development
# CMD ["npm", "run", "dev"]
# for production
CMD ["npm", "run", "start"]

# Сборка образа
# sudo docker build -t express-auth .

# Запуск образа
# sudo docker run -p 8082:8082 express-auth
