import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// INTERFACES
import { IUserRequest } from '../interfaces/user-request.interface';

export const CurrentUser = createParamDecorator(
	(data: unknown, context: ExecutionContext): IUserRequest => {
		const request = context.switchToHttp().getRequest();
		return request.user as IUserRequest;
	},
);
