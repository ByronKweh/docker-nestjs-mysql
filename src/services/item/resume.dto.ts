import { Resume } from '@prisma/client';

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
