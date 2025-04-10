import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

@Module({
	imports: [AppConfigModule, PrismaModule, AuthModule, UserModule],
	controllers: [AppController],
})
export class AppModule {}
