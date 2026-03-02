# ---------- FRONTEND BUILD ----------
FROM node:18 AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build


# ---------- BACKEND ----------
FROM node:18

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install

COPY backend/ .

# Copy frontend build into backend public folder
COPY --from=frontend-build /app/frontend/build ./public

EXPOSE 5000

CMD ["node", "server.js"]
