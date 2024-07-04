# Stage 1: Build the React application
FROM node:20.11.0 as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.11.0

RUN npm install -g serve

WORKDIR /app

COPY --from=build /app/build .

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]
