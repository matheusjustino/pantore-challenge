import {
	BadRequestException,
	Inject,
	Injectable,
	Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

// SERVICES
import { PrismaService } from '../prisma/prisma.service';

// ENUMS
import { AuthProvidersEnum } from './enums/auth-providers.enum';

// INTERFACES
import { IAuthService } from './interfaces/auth-service.interface';
import { IUserRequest } from './interfaces/user-request.interface';

// DTOS
import { CreateUserDTO } from './dtos/create-user.dto';
import { LoginDTO } from './dtos/login.dto';

@Injectable()
export class AuthService implements IAuthService {
	private readonly logger: Logger = new Logger(AuthService.name);

	@Inject(PrismaService)
	private readonly prismaService: PrismaService;
	@Inject(AuthProvidersEnum.JWT_SERVICE)
	private readonly jwtService: JwtService;

	public async register(data: CreateUserDTO): Promise<boolean> {
		this.logger.log(`register`);

		const user = await this.prismaService.user.findFirst({
			where: {
				email: data.email,
			},
		});
		if (user) {
			throw new BadRequestException(`Email already registered`);
		}

		await this.prismaService.user.create({
			data,
		});

		return true;
	}

	public async doLogin(data: LoginDTO): Promise<string> {
		this.logger.log(`doLogin`);

		const user = await this.prismaService.user.findFirst({
			where: {
				email: data.email,
			},
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				password: true,
			},
		});
		if (!user) {
			this.logger.error(`User not found`);
			throw new BadRequestException('Invalid Credentials');
		}

		if (!(await compare(data.password, user.password))) {
			this.logger.error(`invalid credentials`);
			throw new BadRequestException('Invalid Credentials');
		}

		const token = this.jwtService.sign(
			{
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			} as IUserRequest,
			{
				secret: process.env.JWT_SECRET,
			},
		);

		return token;
	}
}
