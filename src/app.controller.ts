import { Controller, Get, Param, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './modules/auth/authenticated.guard';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	@UseGuards(AuthenticatedGuard)
	async testAuth(@Request() req) {
		return {
			message: "there is info",
			data: {
				name: req.user['_doc'].name,
				lastName: req.user['_doc'].lastName,
				admin: req.user['_doc'].admin
			}
		};
	}
	@Get('ip')
	getIp(@Request() req) {
		return req.ip;
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Request() req) {
		return {
			message: 'Logged In'
		}
	}

	@Get('photos/:fileName')
	getPicture(@Param('fileName') fileName: string, @Res() res): Observable<Object> {
		return of(res.sendFile(join(process.cwd(), 'uploads/' + fileName)));
	}
}
