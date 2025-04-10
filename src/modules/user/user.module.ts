import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserProviders } from './user.providers';

@Module({
	controllers: [UserController],
	providers: UserProviders,
})
export class UserModule {}
