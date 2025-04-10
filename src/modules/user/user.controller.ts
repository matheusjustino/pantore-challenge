import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Patch,
	Query,
	UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

// GUARDS
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

// DECORATORS
import { CurrentUser } from '../auth/decorators/user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

// ENUMS
import { UserProvidersEnum } from './enum/user-providers.enum';

// INTERFACES
import { IUserService } from './interfaces/user-service.interface';
import { IUserRequest } from '../auth/interfaces/user-request.interface';

// DTOs
import { GetUsersQuery } from './dtos/get-users-query.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserDTO } from './dtos/user.dto';

@ApiTags('[USER]')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
	@Inject(UserProvidersEnum.USER_SERVICE)
	private readonly userService: IUserService;

	@ApiOkResponse({
		type: UserDTO,
		description: 'User fetched successfully',
	})
	@Get('me')
	public async me(@CurrentUser() { id }: IUserRequest) {
		return this.userService.getUserById(id);
	}

	@ApiOkResponse({
		type: [UserDTO],
		description: 'Users fetched successfully',
	})
	@Get()
	public async getUsers(@Query() query: GetUsersQuery) {
		return this.userService.getUsers(query);
	}

	@ApiOkResponse({
		type: UserDTO,
		description: 'User by ID fetched successfully',
	})
	@Get(':id')
	public async getUserById(@Param('id') userId: string) {
		return this.userService.getUserById(userId);
	}

	@ApiOkResponse({
		type: UserDTO,
		description: 'User updated successfully',
	})
	@UseGuards(RolesGuard)
	@Roles(Role.ADMIN)
	@Patch(':id')
	public async updateUser(
		@Param('id') userId: string,
		@Body() payload: UpdateUserDTO,
	) {
		return this.userService.updateUser(userId, payload);
	}

	@ApiOkResponse({
		type: UserDTO,
		description: 'User deleted successfully',
	})
	@UseGuards(RolesGuard)
	@Roles(Role.ADMIN)
	@Delete(':id')
	public async deleteUser(@Param('id') userId: string) {
		return this.userService.deleteUser(userId);
	}
}
