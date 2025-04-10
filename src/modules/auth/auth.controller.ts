import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

// ENUMS
import { AuthProvidersEnum } from './enums/auth-providers.enum';

// INTERFACES
import { IAuthService } from './interfaces/auth-service.interface';

// DTOs
import { LoginDTO } from './dtos/login.dto';
import { CreateUserDTO } from './dtos/create-user.dto';

@ApiTags('[AUTH]')
@Controller('auth')
export class AuthController {
	@Inject(AuthProvidersEnum.AUTH_SERVICE)
	private readonly authService: IAuthService;

	@ApiResponse({
		status: 201,
		description: 'User created successfully',
	})
	@Post('register')
	public register(@Body() body: CreateUserDTO) {
		return this.authService.register(body);
	}

	@ApiOkResponse({
		type: String,
		description: 'User logged in successfully',
	})
	@Post('login')
	public doLogin(@Body() body: LoginDTO) {
		return this.authService.doLogin(body);
	}
}
