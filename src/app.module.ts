import { Module } from '@nestjs/common';
import { I18nModule } from './i18n/module';

import { RootController } from './controllers/root.controller';
import { PrismaService } from './services/prisma/prisma.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [I18nModule],
  controllers: [RootController, UserController],
  providers: [PrismaService, UserService],
})
export class AppModule {}
