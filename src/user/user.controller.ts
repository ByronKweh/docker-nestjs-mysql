import { Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post('/')
  async index() {
    return { healthz: true };
  }
}
