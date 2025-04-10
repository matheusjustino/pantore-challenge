import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthProviders } from './auth.providers';

@Global()
@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: {
				expiresIn: '12h',
			},
		}),
	],
	controllers: [AuthController],
	providers: AuthProviders,
	exports: AuthProviders,
})
export class AuthModule {}
