import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
	ExpressAdapter,
	NestExpressApplication,
} from '@nestjs/platform-express';
import compression from 'compression';
import { json } from 'express';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './modules/app-config/filters/all-exceptions.filter';
import { configureAndBuildSwagger } from './modules/app-config/swagger';
import { Seed } from './seed/database.seed';

async function bootstrap() {
	const PORT = process.env.PORT || 8080;
	const app = await NestFactory.create<NestExpressApplication>(
		AppModule,
		new ExpressAdapter(),
	);

	app.enableCors({
		credentials: true,
	});

	app.use(
		helmet({
			contentSecurityPolicy: false,
		}),
	);
	app.use(compression());
	app.use(json({ limit: '30mb' }));
	app.setGlobalPrefix('api');
	app.useGlobalFilters(new AllExceptionsFilter());
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			stopAtFirstError: true,
		}),
	);

	app.enableShutdownHooks();

	configureAndBuildSwagger(app);

	await Seed();

	await app.listen(PORT, () => Logger.log(`App running on port: ${PORT}`));
}
bootstrap();
