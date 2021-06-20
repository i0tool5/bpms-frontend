FROM node:latest
WORKDIR /usr/src/app
COPY . .
# RUN ["useradd", "-m", "developer"]
# USER developer
RUN ["npm", "install"]
CMD ["npm", "run", "serve"]
