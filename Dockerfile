# Dockerfile for building the full-stack app

# App Description
# Frontend: React App project at ./
# Server: Express Server code at ./server/
# 
# The frontend is built and the generated build is server by the server.
#
# Environment Configs:
## Environment variables for the website (Frontend)
### REACT_APP_SERVER_URL=<PASTE SERVER URL HERE>
## Environment variables for the server (backend)
### MONGO_CONNECTION_URL=<PASTE MONGO DB CONNECTION STRING HERE>
### PORT=<INSERT PORT NUMBER HERE>


# Build react client (Node v16)
FROM node:16-alpine

# Set working directory to /app/
WORKDIR /app

# Copy ./package.json (frontend) to /app/
COPY package*.json ./

#  Installing frontend dependencies
RUN npm install --silent --force

# copy project files to /app/
COPY . .

# Produce a production build of the frontend (./) , stored in /build/
RUN npm run build

# Install server dependencies from ./server/package.json
RUN npm install --silent --prefix server/

# Expose PORT 5000, the server runs on this by default
EXPOSE 5000

# Execute custom script to start the Server, this script is defined in ./package.json
CMD ["npm","run","production"]