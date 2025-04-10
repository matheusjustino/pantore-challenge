import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';

// DTOs
import { CreateUserDTO } from '@/modules/auth/dtos/create-user.dto';

const prisma = new PrismaClient();

export const Seed = async (): Promise<void> => {
	try {
		const payload: CreateUserDTO = {
			name: 'ADMIN',
			email: 'admin@email.com',
			password: '123',
		};
		const salt = await genSalt(12);
		const hashedPass = await hash(payload.password, salt);
		payload.password = hashedPass;
		await prisma.user.create({
			data: payload,
		});

		Logger.log('Database seeded', 'DatabaseSeed');
	} catch {
		Logger.error('Seed already executed', 'DatabaseSeed');
	}
};
