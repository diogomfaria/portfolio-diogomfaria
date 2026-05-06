# Estágio 1: Dependências e Build
FROM node:20-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app

# Copia os arquivos de configuração do monorepo (raiz)
# Certifique-se de que o package.json da raiz existe!
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Copia o código do backend
COPY backend/ ./backend/

# Instala as dependências e faz o build
RUN pnpm install --filter backend --frozen-lockfile
RUN pnpm --filter backend run build

# Estágio 2: Isolamento (A "mágica" do pnpm)
# O comando deploy cria uma pasta com TUDO o que o backend precisa para rodar
RUN pnpm --filter backend --prod deploy /app/isolated --legacy

# Estágio 3: Runner (Imagem final leve)
FROM node:20-alpine AS runner
WORKDIR /app
USER node

# Copiamos apenas a pasta isolada que contém o dist e as node_modules REAIS
COPY --from=builder /app/isolated .

EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

CMD ["node", "dist/main.js"]