import { NestFactory } from '@nestjs/core';
import { GlobalModule } from './global.module';

async function bootstrap() {
    const app = await NestFactory.create(GlobalModule);
    const port = process.env.PORT ?? 3011;
    await app.listen(port);
    console.log(`Server started on port ${port}`);
}

bootstrap();
