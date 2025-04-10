import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserDTO {
	@ApiProperty({ type: String, description: 'ID' })
	public id: string;

	@ApiProperty({ type: String, description: 'Name' })
	public name: string;

	@ApiProperty({ type: String, description: 'Email' })
	public email: string;

	@ApiProperty({ enum: Role, description: 'Role' })
	public role: Role;

	@ApiProperty({ type: Date, description: 'CreatedAt' })
	public createdAt: Date;

	@ApiProperty({ type: Date, description: 'UpdatedAt' })
	public updatedAt: Date;
}
