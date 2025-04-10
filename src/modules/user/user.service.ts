import {
	BadRequestException,
	Inject,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';

// SERVICES
import { PrismaService } from '../prisma/prisma.service';

// INTERFACES
import { IUserService } from './interfaces/user-service.interface';

// DTOs
import { UserDTO } from './dtos/user.dto';
import { GetUsersQuery } from './dtos/get-users-query.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Injectable()
export class UserService implements IUserService {
	private readonly logger: Logger = new Logger(UserService.name);

	@Inject(PrismaService)
	private readonly prismaService: PrismaService;

	public async getUserById(userId: string): Promise<UserDTO> {
		this.logger.log('Get User By Id');

		const user = await this.prismaService.user.findUnique({
			where: {
				id: userId,
			},
			omit: {
				password: true,
			},
		});
		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}

	public async getUsers(payload: GetUsersQuery): Promise<UserDTO[]> {
		this.logger.log('Get Users');

		const fields = ['name', 'email'];
		const orConditions = fields
			.filter((key) => payload[key])
			.map((key) => ({
				[key]: {
					contains: payload[key],
					mode: 'insensitive',
				},
			}));

		return this.prismaService.user.findMany({
			where: {
				OR: orConditions.length > 0 ? orConditions : undefined,
			},
			omit: {
				password: true,
			},
		});
	}

	public async updateUser(
		userId: string,
		payload: UpdateUserDTO,
	): Promise<UserDTO> {
		this.logger.log('Update User');

		const user = await this.prismaService.user.findUnique({
			where: {
				id: userId,
			},
		});
		if (!user) {
			throw new NotFoundException('User not found');
		}

		if (payload.email) {
			const emailAlreadyUsed = await this.prismaService.user.findUnique({
				where: {
					email: payload.email,
				},
			});
			if (emailAlreadyUsed) {
				throw new BadRequestException('Email already in use');
			}
		}

		const updatedUser = await this.prismaService.user.update({
			where: {
				id: user.id,
			},
			data: payload,
			omit: {
				password: true,
			},
		});

		return updatedUser;
	}

	public async deleteUser(userId: string): Promise<UserDTO> {
		this.logger.log('Delete User');

		const user = await this.prismaService.user.findUnique({
			where: {
				id: userId,
			},
		});
		if (!user) {
			throw new NotFoundException('User not found');
		}

		return this.prismaService.user.delete({
			where: {
				id: user.id,
			},
			omit: {
				password: true,
			},
		});
	}
}
