import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/common/enums/role.enum';

describe('UserService', () => {
  let service: UserService;
  let prisma:PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,{
          provide:PrismaService,
          useValue:{
            user:{
              findMany:jest.fn().mockResolvedValue([]),
              findUnique:jest.fn().mockResolvedValue(null),
              create:jest.fn().mockResolvedValue(null),
              update:jest.fn().mockResolvedValue(null),
              delete:jest.fn().mockResolvedValue(null),
            }
          }
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma=module.get<PrismaService>(PrismaService)
  });

  it('should create a user',async () => {
    const mocker = {
      id:1,
      email:'test@gmail',
      nom:'test',
      password:'test',
      role:Role.ADMIN,
      numero:'1234567890'
    };(
      prisma.user.create as jest.Mock
    ).mockResolvedValue(mocker)
    const result = await service.createUser({
      nom:'test',
      role:Role.ADMIN,
      email:'test@gmail',
      password:'hashed',
      numero:'1234567890'
    })
    expect(result).toEqual(mocker)
    expect(prisma.user.create).toHaveBeenCalled()
    expect(service).toBeDefined();
  });
});
