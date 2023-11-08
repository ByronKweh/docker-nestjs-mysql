import { Prisma, PrismaClient, PrismaPromise } from '@prisma/client';

const accounts: Prisma.AccountCreateInput[] = [
  {
    email: 'byronkweh@gmail.com',
    password: '$2a$10$vKMQzztwRn6QtOvVSuS7F.D/XiZv64ZWPR4iuomnBcSCxjTAD3M7K',
  },
  {
    email: 'test@gmail.com',
    password: '$2a$10$vKMQzztwRn6QtOvVSuS7F.D/XiZv64ZWPR4iuomnBcSCxjTAD3M7K',
  },
];

export default function (prisma: PrismaClient): PrismaPromise<unknown>[] {
  return accounts.map((item) =>
    prisma.account.create({
      data: item,
    }),
  );
}
