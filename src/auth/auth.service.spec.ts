import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/enums/role.enum';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { rootCertificates } from 'tls';
import { ConflictException, UnauthorizedException } from '@nestjs/common';


// On mock bcrypt une seule fois pour tous les tests
jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve('hashedPassword')),
  compare: jest.fn((password: string, hashed: string) =>
    Promise.resolve(password === '123456')
  ),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn(),
            createUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: { sign: jest.fn(() => 'token') },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should create a new user and return user with token', async () => {
    const mockUser = {
      id: 1,
      email: 'test@gmail',
      password: 'hashedPassword',
      role: Role.CLIENT,
    };

    (userService.getUserByEmail as jest.Mock).mockResolvedValue(null);
    (userService.createUser as jest.Mock).mockResolvedValue(mockUser);

    const result = await service.register({
      nom: 'Test',
      numero: '1234567890',
      email: 'test@gmail',
      password: '123456',
      role: Role.CLIENT,
    });

    expect(result.user.password).toBe('hashedPassword'); // le mot de passe doit être hashé
    expect(result.token).toBe('token');
  });

  it('should throw ConflictException if user already exists', async () => {
    (userService.getUserByEmail as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@gmail',
    });

    await expect(
      service.register({
        nom: 'Test',
        numero: '1234567890',
        email: 'test@gmail',
        password: '123456',
        role: Role.CLIENT,
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('should return user and token if login is successful', async () => {
    const mockUser = {
      id: 1,
      email: 'test@gmail',
      password: 'hashedPassword',
      role: Role.CLIENT,
    };

    (userService.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);

    const result = await service.login({
      email: 'test@gmail',
      password: '123456',
    });

    expect(result.user).toEqual(mockUser);
    expect(result.token).toBe('token');
  });

  it('should throw UnauthorizedException if password is invalid', async () => {
    const mockUser = {
      id: 1,
      email: 'test@gmail',
      password: 'hashedPassword',
      role: Role.CLIENT,
    };

    (userService.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);

    // ⚡ On change le mock temporairement pour simuler un mauvais mot de passe
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    await expect(
      service.login({ email: 'test@gmail', password: 'wrongpass' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if user not found', async () => {
    (userService.getUserByEmail as jest.Mock).mockResolvedValue(null);

    await expect(
      service.login({ email: 'unknown@mail.com', password: '123456' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});