FROM node:lts-alpine

WORKDIR /projects/github/kafedra-back

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
# sudo docker build -t kafedra-back .

# Запуск образа
# sudo docker run -p 8082:8082 kafedra-back
