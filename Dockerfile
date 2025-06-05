FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalar las dependencias dentro del contenedor
RUN npm ci --omit=dev

# Copiar el resto de los archivos del proyecto, excluyendo node_modules
COPY . .

# Exponer el puerto correcto
EXPOSE 3002

# Comando para iniciar la aplicación
CMD ["npm", "start"]