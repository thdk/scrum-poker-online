FROM node:14 AS node_base

FROM openjdk:8-alpine
COPY --from=node_base . .

RUN npm install -g firebase-tools
RUN firebase setup:emulators:firestore

ENTRYPOINT ["/usr/local/bin/firebase"]