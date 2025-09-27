import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Role } from 'src/common/enums/role.enum';


describe('UserController', () => {
  let controller: UserController;
  let service:UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[{
        provide:UserService,
        useValue:{
          getUsers:jest.fn().mockResolvedValue([]),
          getUserByEmail:jest.fn().mockResolvedValue(null),
          createUser:jest.fn().mockResolvedValue(null),
          updateUser:jest.fn().mockResolvedValue(null),
          deleteUser:jest.fn().mockResolvedValue(null),
        }
      }]
    }).compile();

    controller = module.get<UserController>(UserController);
    service=module.get<UserService>(UserService)
  });

  it('should return all users',async () => {
    const mockUsers = [{
      id:1,
      email:'test@gmail',
      nom:'test',
      password:'test',
      numero:'1234567890',
      role:Role.ADMIN
    }
    ]
    ;(
      service.getUsers as jest.Mock
    ).mockResolvedValue(mockUsers)
    const result = await controller.getUers()
    expect(result).toEqual(mockUsers)
    expect(controller).toBeDefined();
  });
});
