FROM node:20-alpine AS app

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate && npm run build

EXPOSE 3000

CMD ["npm", "run", "start:docker"]
