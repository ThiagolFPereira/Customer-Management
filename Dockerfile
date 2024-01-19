# Escolhendo uma imagem base com Node.js
FROM node:14

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos de dependências (package.json e package-lock.json) para o contêiner
COPY package*.json ./

RUN npm cache clean --force

# Instalando as dependências
RUN npm install

# Copiando todo o código fonte para o contêiner
COPY . .

# Copiando o script de inicialização
COPY start.sh .

RUN export NODE_OPTIONS=--openssl-legacy-provider

# Tornando o script executável
RUN chmod -R 777 start.sh

# Construindo a aplicação React
RUN npm run build

# Expondo a porta do servidor Node.js
EXPOSE 9090

# Comando para iniciar o servidor Node.js
CMD ["./start.sh"]