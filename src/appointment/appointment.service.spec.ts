import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto/create-appointment.dto';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentService,
        {
          provide: PrismaService,
          useValue: {
            appointment: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an appointment', async () => {
    const createAppointmentDto: CreateAppointmentDto = {
      vetId: 1,
      ownerId: 1,
      productId: 1, // correspond à ton DTO actuel
    };

    const mockAppointment = { id: 1, ...createAppointmentDto };

    // Mock Prisma
    (prisma.appointment.create as jest.Mock).mockResolvedValue(mockAppointment);

    const result = await service.createAppointment(createAppointmentDto);

    expect(prisma.appointment.create).toHaveBeenCalledWith({
      data: createAppointmentDto,
    });
    expect(result).toEqual(mockAppointment);
  });

  it('should get appointment by id', async () => {
    const mockAppointment = { id: 1, vetId: 1, ownerId: 1, producId: 1 };

    (prisma.appointment.findUnique as jest.Mock).mockResolvedValue(mockAppointment);

    const result = await service.getApppointmentById(1);

    expect(prisma.appointment.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        owner: { select: { id: true, nom: true, email: true, numero: true } },
        vet: { select: { id: true, nom: true, email: true, numero: true } },
        product: { select: { id: true, nom: true } },
      },
    });
    expect(result).toEqual(mockAppointment);
  });

  it('should get all appointments', async () => {
    const mockAppointments = [
      { id: 1, vetId: 1, ownerId: 1, producId: 1 },
      { id: 2, vetId: 2, ownerId: 2, producId: 2 },
    ];

    (prisma.appointment.findMany as jest.Mock).mockResolvedValue(mockAppointments);

    const result = await service.getAppointements();

    expect(prisma.appointment.findMany).toHaveBeenCalledWith({
      include: {
        owner: { select: { id: true, nom: true, email: true, numero: true } },
        vet: { select: { id: true, nom: true, email: true, numero: true } },
        product: { select: { id: true, nom: true } },
      },
    });
    expect(result).toEqual(mockAppointments);
  });
});