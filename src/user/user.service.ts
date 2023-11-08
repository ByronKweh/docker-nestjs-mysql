import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import { LoginUserDTO } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { Resume } from '@prisma/client';
import bcrypt from 'bcryptjs';

export class ResumeDTO {
  id: number;
  content: string | null;
  updatedAt: Date;
  createdAt: Date;

  constructor({ id, content, updatedAt, createdAt }: Resume) {
    this.id = id;
    this.content = content;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }
}

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  //TODO move the resume to a job seeking domain later

  async getAllResumesByUserId(user_id: number) {
    const items = await this.prisma.resume.findMany({
      where: {
        account: {
          id: user_id,
        },
      },
    });

    return items.map((item) => new ResumeDTO(item));
  }

  async getResumeById(id: number) {
    const item = await this.prisma.resume.findFirst({
      where: { id },
    });

    if (!item) {
      return null;
    }

    return new ResumeDTO(item);
  }

  //TODO (Resume) end

  // TODO Move to a generalized util

  async getUserByEmail(email: string) {
    const user = await this.prisma.account.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  //TODO END

  async validatePassword(password: string, hashed_password: string) {
    return bcrypt.compare(password, hashed_password);
  }

  async login(loginUserDTO: LoginUserDTO) {
    const user = await this.getUserByEmail(loginUserDTO.email);

    const is_correct_password = await this.validatePassword(
      loginUserDTO.password,
      user.password,
    );

    if (!is_correct_password) {
      throw new BadRequestException('Username or password is incorrect');
    }

    return await this.signJwt(user.email);
  }

  async signJwt(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
