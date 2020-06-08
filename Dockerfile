FROM node:12-alpine

LABEL maintainer="shipyardsuite@gmail.com"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG SERVICE_NAME_ARG=${SERVICE_NAME}
ARG HEALTHCHECK_ID_ARG=${HEALTHCHECK_ID}
ARG NODE_ENV_ARG=${NODE_ENV}

ENV SERVICE_NAME=${SERVICE_NAME_ARG}
ENV SERVICE_PORT=${SERVICE_PORT}
ENV HEALTHCHECK_ID=${HEALTHCHECK_ID_ARG}
ENV NODE_ENV=${NODE_ENV_ARG}

COPY . /usr/src/app/
RUN npm install
RUN apk --update --no-cache add curl

ARG CACHEBUST=1
CMD [ "npm", "start" ]

HEALTHCHECK --interval=20s --timeout=10s --start-period=10s --retries=3 CMD curl --fail https://hc-ping.com/${HEALTHCHECK_ID} || exit 1