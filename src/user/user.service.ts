import { Injectable } from '@nestjs/common';
import { ResumeDTO } from 'src/services/item/resume.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
}
