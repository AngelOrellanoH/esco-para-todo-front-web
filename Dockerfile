# Etapa 1: Build con Node.js
FROM node:18-alpine AS build

WORKDIR /app

# Copiar package.json y lock para instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto y construir
COPY . .
RUN npm run build

# Etapa 2: Servidor NGINX para servir la app
FROM nginx:stable-alpine

# Eliminar configuración por defecto de NGINX y añadir la personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar la build generada al directorio que sirve NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto que usará Azure App Service
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
