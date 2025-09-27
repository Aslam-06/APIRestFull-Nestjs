import { Test, TestingModule } from '@nestjs/testing';
import { CareController } from './care.controller';
import { CareService } from './care.service';
import e from 'express';

describe('CareController', () => {
  let controller: CareController;
  let service:CareService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareController],
      providers: [
        {
          provide: CareService,
          useValue: {
            createCare: jest.fn(),
            getCares: jest.fn(),
            getCareById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CareController>(CareController);
    service = module.get<CareService>(CareService);
  });

  it('should be defined',async () => {
    expect(controller).toBeDefined();
  });
  it('should create a care', async()=>{
    const mockCare = {
      id:1,
      productId:1,
      vetId:1
    };
    (service.getCareById as jest.Mock).mockResolvedValue(mockCare);
    const care=await controller.getCareById(1);
    expect(service.getCareById).toHaveBeenCalledWith(1);
    expect(care).toEqual(mockCare);
    
  })
});
