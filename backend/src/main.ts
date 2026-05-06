import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // O Cloud Run passa a porta via variável de ambiente PORT
  const port = process.env.PORT || 8080;

  // IMPORTANTE: Escutar em 0.0.0.0 para ser acessível fora do container
  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);

  app.enableCors({
    origin: 'https://sua-url-do-frontend.a.run.app', // No início pode usar '*' para testar
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT || 8080);
}
bootstrap();