import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConflictException, Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AllExceptionsFilter } from '../common/filters/all-exceptions.filter';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.use(helmet());

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONT_END_URL, // Frontend URL
    credentials: true, // Allow cookies if needed
  });

  // Optional: Use global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties without decorators
      forbidNonWhitelisted: true, // Throw errors if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to DTO instances
      exceptionFactory: (errors) => {
        const errorMessages = errors.map((error) => {
          const constraints = [];
          for (const key in error.constraints) {
            constraints.push(error.constraints[key]);
          }
          return `${error.property}: ${constraints.join(', ')}`;
        });
        Logger.error(`Validation failed: ${errorMessages.join('; ')}`);
        return new ConflictException(errorMessages);
      },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription('API documentation for the E-Commerce application')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`🚀 Server is running on http://localhost:${PORT}/api/`);
}
bootstrap();
