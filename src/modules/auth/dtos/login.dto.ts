import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
	@ApiProperty({ type: String, description: 'Email' })
	@IsString({ message: 'Email is required' })
	@IsEmail()
	public email: string;

	@ApiProperty({ type: String, description: 'Password' })
	@IsString({ message: 'Password is required' })
	public password: string;
}
