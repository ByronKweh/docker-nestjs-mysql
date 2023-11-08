import { Body, Controller, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserService } from './user.service';

export class LoginUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/login')
  async index(@Body() loginUserDTO: LoginUserDTO) {
    return await this.userService.login(loginUserDTO);
  }
}
