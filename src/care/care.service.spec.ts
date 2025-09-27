import { Test, TestingModule } from '@nestjs/testing';
import { CareService } from './care.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('CareService', () => {
  let service: CareService;
  let prisma:PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CareService,{       
        provide: PrismaService,
        useValue: {
          care: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
          },
        },}
      ],
    }).compile();

    service = module.get<CareService>(CareService);
    prisma=module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it ('should create a care',async()=>{
    const createCareDto={
        productId:1,
        vetId:1
    }
    const createSpy=jest.spyOn(prisma.care,'create').mockResolvedValueOnce({
        id:1,
        productId:createCareDto.productId,
        vetId:createCareDto.vetId,
        createdAt:new Date(),
        updatedAt:new Date()
    })
    const care=await service.createCare(createCareDto)
    expect(createSpy).toHaveBeenCalledWith({
        data:{
            productId:createCareDto.productId,
            vetId:createCareDto.vetId
        }
    });
    expect(care).toEqual(expect.objectContaining({
        id:1,
        productId:createCareDto.productId,
        vetId:createCareDto.vetId,
    }))
  })
});
