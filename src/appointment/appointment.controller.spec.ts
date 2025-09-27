import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';

describe('AppointmentController', () => {
  let controller: AppointmentController;
  let service: AppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [
        {
          provide: AppointmentService,
          useValue: {
            createAppointment: jest.fn(),
            getAppointements: jest.fn(),
            getApppointmentById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AppointmentController>(AppointmentController);
    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an appointment', async () => {
    const createAppointmentDto = {
      date: new Date(),
      time: '10:00',
      vetId: 1,
      petId: 1,
      ownerId: 1,
      productId: 1,
    };

    const createdAppointment = { id: 1, ...createAppointmentDto };

    jest
      .spyOn(service, 'createAppointment')
      .mockResolvedValueOnce(createdAppointment);

    const result = await controller.createAppointment(createAppointmentDto);
    expect(result).toEqual(createdAppointment);
  });

  it('should get all appointments', async () => {
    const appointments = [{ id: 1 }, { id: 2 }];
    jest
      .spyOn(service, 'getAppointements')
      .mockResolvedValueOnce(appointments);

    const result = await controller.getAppointments();
    expect(result).toEqual(appointments);
  });

  it('should get appointment by id', async () => {
    const appointment = { id: 1 };
    jest
      .spyOn(service, 'getApppointmentById')
      .mockResolvedValueOnce(appointment);

    const result = await controller.getAppointmentById(1);
    expect(result).toEqual(appointment);
  });
});