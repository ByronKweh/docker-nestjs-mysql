import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import { UserDTO } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { Account, Resume } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

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
    // const items = await this.prisma.resume.findMany({
    //   where: {
    //     account: {
    //       id: user_id,
    //     },
    //   },
    // });

    const items = (await this.prisma
      .$queryRaw`SELECT * FROM resumes WHERE account_id = ${user_id}`) as Resume[];

    return items.map((item) => new ResumeDTO(item));
  }

  async getResumeById(id: number) {
    // const item = await this.prisma.resume.findFirst({
    //   where: { id },
    // });

    const item = (await this.prisma
      .$queryRaw`SELECT * FROM resumes WHERE id = ${id}`) as Resume | null;

    if (!item) {
      return null;
    }

    return new ResumeDTO(item);
  }

  //TODO (Resume) end

  // TODO Move to a generalized util

  async getUserByEmail(email: string) {
    // const user = await this.prisma.account.findFirst({
    //   where: {
    //     email: email,
    //   },
    // });

    const user = (await this.prisma
      .$queryRaw`SELECT * FROM accounts WHERE email = '${email}' LIMIT 1`) as
      | Account
      | undefined;

    return user;
  }

  //TODO END

  async validatePassword(password: string, hashed_password: string) {
    return bcrypt.compareSync(password, hashed_password);
  }

  async login(loginUserDTO: UserDTO) {
    const user = await this.getUserByEmail(loginUserDTO.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

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

  async register(registerUserDTO: UserDTO) {
    const user = await this.getUserByEmail(registerUserDTO.email);

    if (user) {
      throw new BadRequestException('User already registered');
    }

    return await this.prisma.account.create({
      data: {
        email: registerUserDTO.email,
        password: bcrypt.hashSync(registerUserDTO.password, 10),
      },
    });
  }

  async getResumeByEmail(email: string) {
    const resume = await this.prisma.resume.findFirst({
      where: {
        account: {
          email: email,
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    return {
      resume_url: resume?.resume_url || '',
    };
  }

  async uploadResumeForEmail(email: string, file_url: string) {
    return await this.prisma.resume.create({
      data: {
        title: '',
        content: '',
        published: true,
        resume_url: file_url,
        account: {
          connect: {
            email: email,
          },
        },
      },
    });
  }
}
