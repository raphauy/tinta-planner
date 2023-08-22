FROM raphauy/nextjs-base:latest AS build

WORKDIR /app

COPY . .

RUN pnpm install
RUN pnpx prisma generate
RUN pnpm build

RUN rm .env

EXPOSE 3000

CMD ["pnpm", "run", "start"]