import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS
  app.enableCors({
    origin: 'http://localhost:8080', // Permitir apenas esta origem
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api'); // Adiciona o prefixo 'api' a todas as rotas

  await app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
  });
}
bootstrap();