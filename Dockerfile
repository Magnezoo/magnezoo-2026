FROM oven/bun:1.3.9

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 3000

CMD ["sh", "-c", "bunx prisma generate && bunx prisma migrate deploy && bun run build && bun run start"]