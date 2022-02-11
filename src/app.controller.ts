import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
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
        lastName: req.user['_doc'].lastName
      }
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return {
      message: 'Logged In'
    }
  }


}
