import { Body, Controller, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}

@Controller('user')
export class UserController {
  @Post('/login')
  async index(@Body() createUserDto: CreateUserDto) {
    return { healthz: true };
  }
}
