import {
	Injectable,
	CanActivate,
	ExecutionContext,
	Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// DECORATORS
import { ROLES_KEY } from '../decorators/roles.decorator';

// INTERFACES
import { IUserRequest } from '../interfaces/user-request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
	@Inject(Reflector)
	private readonly reflector: Reflector;

	public canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector
			.getAllAndOverride<
				string[]
			>(ROLES_KEY, [context.getHandler(), context.getClass()])
			.map((role) => role.toUpperCase());

		if (!requiredRoles) return true;

		const user: IUserRequest = context.switchToHttp().getRequest().user;

		return requiredRoles.some((role) => user.role === role);
	}
}
