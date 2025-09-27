import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { register } from 'module';
import { profile } from 'console';
import { Role } from 'src/common/enums/role.enum';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers:[
        {
          provide:AuthService,
          useValue:{
            register:jest.fn().mockResolvedValue({
              id:1,
              email:'test@gmail',
              nom:'test',
              role:'CLIENT',
              password:'hashedpassword',
              numero:'1234567890',
              profileImage:'http://image.url'

          }),
            login:jest.fn().mockResolvedValue({
              access_token:'testtoken'
            })
        }}
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', async () => {
    const result = await controller.register({
      email:'test@gmail',
      nom:'test',
      role:Role.CLIENT,
      password:'hashedpassword',
      numero:'1234567890',
      profileImageUrl:'http://image.url'
    });
    expect(result).toEqual({
      id:1,
      email:'test@gmail',
      nom:'test',
      role:Role.CLIENT,
      password:'hashedpassword',
      numero:'1234567890',
      profileImage:'http://image.url'
    });
    expect(controller).toBeDefined();
  });
  it('should login a user', async () => {
    const result = await controller.login({
      email:'test@gmail',
      password:'testpassword'
    });
    expect(result).toEqual({
      access_token:'testtoken'
    });
    expect(controller).toBeDefined();
    expect(service.login).toHaveBeenCalledWith({
      email:'test@gmail', 
      password:'testpassword'
    });
  });
});
