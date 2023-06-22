FROM node:16 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.18-alpine AS deploy-static

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/build-static .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

FROM node:16-alpine AS deploy-node

WORKDIR /app

RUN rm -rf ./*

COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./

RUN npm install --only=production

EXPOSE 3000
ENV HOST=0.0.0.0

CMD ["npm", "run", "serve"]
