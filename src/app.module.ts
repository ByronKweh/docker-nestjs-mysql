import { Module } from '@nestjs/common';
import { I18nModule } from './i18n/module';

import { RootController } from './controllers/root.controller';
import { PrismaService } from './services/prisma/prisma.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { JwtModule, JwtSecretRequestType, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    I18nModule,
    // JwtModule.register({
    //   global: true,
    //   secret: 'secret', //TODO put in env
    //   signOptions: { expiresIn: '60s' },
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [RootController, UserController],
  providers: [PrismaService, UserService],
})
export class AppModule {}
