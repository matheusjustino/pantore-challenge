import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
	@ApiProperty({ type: String, description: 'Name' })
	@IsString({ message: 'Name is required' })
	public name: string;

	@ApiProperty({ type: String, description: 'Email' })
	@IsString({ message: 'Email is required' })
	@IsEmail()
	public email: string;

	@ApiProperty({ type: String, description: 'Password' })
	@IsString({ message: 'Password is required' })
	public password: string;
}
