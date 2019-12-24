FROM node:alpine AS builder

WORKDIR /app

COPY . .
RUN npm install -g @angular/cli 
RUN npm install && \
    ng build -c production

FROM nginx:alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/