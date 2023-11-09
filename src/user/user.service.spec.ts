import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../services/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            account: {
              findFirst: jest.fn(),
            },
            $queryRaw: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getUserByEmail', () => {
    // it('should throw NotFoundException if user does not exist', async () => {
    //   // Mock the findFirst function with appropriate typing
    //   (prismaService.account.findFirst as jest.Mock).mockResolvedValue(null);
    //   await expect(
    //     userService.getUserByEmail('nonexistent@example.com'),
    //   ).rejects.toThrowError(NotFoundException);
    // });

    it('should return user if user exists', async () => {
      const mockUser = { id: 1, email: 'existing@example.com' };
      // Mock the findFirst function with appropriate typing
      (prismaService.$queryRaw as jest.Mock).mockResolvedValue(mockUser);
      const user = await userService.getUserByEmail('existing@example.com');
      expect(user).toEqual(mockUser);
    });
  });

  // Add more test cases for other functions like validatePassword and login
});
