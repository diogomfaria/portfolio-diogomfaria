FROM node:20-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY . . 
# O comando abaixo isola o backend e traz TODAS as dependências reais (sem links)
RUN pnpm --filter backend deploy --prod pruned

FROM node:20-alpine AS runner
WORKDIR /app
# Agora copiamos a pasta que o pnpm já isolou pra gente
COPY --from=builder /app/pruned .
EXPOSE 8080
ENV PORT=8080
CMD ["node", "dist/main.js"]