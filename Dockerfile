#FROM node:alpine 
FROM keymetrics/pm2:16-alpine

WORKDIR /usr/src/app

COPY . . 

COPY tsconfig.json .

ENV HOST="0.0.0.0"

#RUN npm install --production
RUN npm install

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["pm2-runtime","start", "prod.ecosystem.config.cjs"]
#CMD ["node","build/index.js"]
