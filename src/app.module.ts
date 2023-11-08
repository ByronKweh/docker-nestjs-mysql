import { Module } from '@nestjs/common';
import { I18nModule } from './i18n/module';

import { RootController } from './controllers/root.controller';
import { ItemController } from './controllers/api/v1/item.controller';
import { PrismaService } from './services/prisma/prisma.service';
import { ItemService } from './services/item/item.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [I18nModule],
  controllers: [RootController, ItemController, UserController],
  providers: [PrismaService, ItemService, UserService],
})
export class AppModule {}
