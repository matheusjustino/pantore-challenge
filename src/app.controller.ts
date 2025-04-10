import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	@Get('health')
	public health(): string {
		return `Server is ON!`;
	}
}
