FROM oven/bun:1.0 as base

WORKDIR /app

# 1. Копируем только необходимые для генерации файлы
COPY package.json bun.lockb ./
COPY prisma/schema.prisma ./prisma/

# 2. Устанавливаем зависимости
RUN bun install

# 3. Явно генерируем клиент с указанием пути
RUN bunx prisma generate --generator=client --schema=./prisma/schema.prisma

# 4. Копируем остальное
COPY . .

# 5. Проверяем наличие сгенерированного клиента
RUN ls -la node_modules/.prisma/client/

CMD ["bun", "run", "start:dev"]