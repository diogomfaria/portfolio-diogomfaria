# Estágio 1: Build e Isolação
FROM node:20-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app

# 1. Copia apenas os arquivos necessários para o lock
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY backend/package.json ./backend/

# 2. Instala dependências (gera a virtual store do pnpm)
RUN pnpm install --filter backend --frozen-lockfile

# 3. Copia o código e faz o build
COPY backend/ ./backend/
RUN pnpm --filter backend run build

# 4. A MÁGICA: O deploy isola o backend e transforma symlinks em arquivos REAIS
# Isso resolve o erro de "@nestjs/core not found"
RUN pnpm --filter backend --prod deploy /app/isolated

# Estágio 2: Runner
FROM node:20-alpine AS runner
WORKDIR /app
USER node

# Copiamos a pasta isolada (que já contém dist e node_modules achatado)
COPY --from=builder /app/isolated .

# DEBUG: Lista os arquivos para você confirmar o path no log do Cloud Run
RUN ls -R dist/

EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

# Se o ls -R mostrar que o main.js está em dist/src, ajuste abaixo
CMD ["node", "dist/main.js"]