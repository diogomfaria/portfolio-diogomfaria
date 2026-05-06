# Estágio 1: Build
FROM node:20-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app

# Copia os arquivos de configuração da raiz (estando no contexto da raiz)
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
# Copia o código do backend
COPY backend/ ./backend/

# Instala apenas as dependências necessárias para o backend
RUN pnpm install --filter backend --frozen-lockfile

# Build do projeto
RUN pnpm --filter backend run build

# Estágio 2: Runner
FROM node:20-alpine AS runner
WORKDIR /app
USER node

COPY --from=builder /app/backend/package.json ./
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/node_modules ./node_modules

EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

RUN ls -la dist/
CMD ["node", "dist/main.js"] || (echo "ERRO FATAL NO NODEJS:" && node dist/main.js 2>&1)
