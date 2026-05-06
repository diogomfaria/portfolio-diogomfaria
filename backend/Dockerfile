# Estágio 1: Build
FROM node:20-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app

# Copia a raiz para pegar o workspace e o lockfile único
COPY . .

# Instala todas as dependências do monorepo
RUN pnpm install --frozen-lockfile

# Compila o backend
RUN pnpm --filter backend run build

# Isola o backend e suas dependências de produção na pasta /app/pruned
RUN pnpm --filter backend --prod deploy pruned

# Estágio 2: Runner
FROM node:20-alpine AS runner
WORKDIR /app
USER node

# Traz apenas o que foi isolado pelo deploy
COPY --from=builder /app/pruned .

EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

CMD ["node", "dist/main.js"]