import { Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post('/login')
  async index() {
    return { healthz: true };
  }
}
