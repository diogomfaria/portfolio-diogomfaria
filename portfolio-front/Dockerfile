# Estágio 1: Build
FROM node:20-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app

# Copia tudo para resolver o workspace
COPY . .
RUN pnpm install --frozen-lockfile

# Build do frontend
RUN pnpm --filter portfolio-front run build

# Estágio 2: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# O Next.js standalone espelha a estrutura do monorepo na saída
COPY --from=builder --chown=nextjs:nodejs /app/portfolio-front/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/portfolio-front/.next/static ./portfolio-front/.next/static
COPY --from=builder /app/portfolio-front/public ./portfolio-front/public

EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

# O server.js fica dentro da pasta espelhada do pacote
CMD ["node", "portfolio-front/server.js"]