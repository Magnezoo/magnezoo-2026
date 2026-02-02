FROM oven/bun:1.3.8

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 3000

CMD ["sh", "-c", "bun run build && bun run start"]