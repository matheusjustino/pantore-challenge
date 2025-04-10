import { Role } from '@prisma/client';

export interface IUserRequest {
	id: string;
	name: string;
	email: string;
	role: Role;
}
