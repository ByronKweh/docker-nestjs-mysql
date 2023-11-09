import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserService } from './user.service';
import { AuthGuard } from '@app/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Resume } from '@prisma/client';

export class UserDTO {
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
  async login(@Body() loginUserDTO: UserDTO) {
    return await this.userService.login(loginUserDTO);
  }

  @Post('/register')
  async register(@Body() loginUserDTO: UserDTO) {
    return await this.userService.register(loginUserDTO);
  }

  @UseGuards(AuthGuard)
  @Get('/resume')
  async test(@Req() req: any) {
    return await this.userService.getResumeByEmail(req.user.email);
  }

  @UseGuards(AuthGuard)
  @Post('upload-resume')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async post(@UploadedFile() file: any, @Req() req: any): Promise<Resume> {
    console.log(file);
    // return;
    return await this.userService.uploadResumeForEmail(
      req.user.email,
      file.path,
    );
  }

  // @UseGuards(AuthGuard)
  @Get('resume/:filename')
  seeUploadedFile(@Param('filename') file_name: string, @Res() res: any) {
    return res.sendFile(file_name, { root: '/' });
  }
}
