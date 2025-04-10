import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDTO {
	@ApiPropertyOptional({ type: String, description: 'Name' })
	@IsOptional()
	public name?: string;

	@ApiPropertyOptional({ type: String, description: 'Name' })
	@IsOptional()
	@IsEmail()
	public email?: string;

	@ApiPropertyOptional({ type: String, description: 'Name' })
	@IsOptional()
	public password?: string;
}
