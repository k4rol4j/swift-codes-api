import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { SwiftCodesService } from './swift-codes.service';
import { SwiftCode } from './schemas/swift-code.schema';

describe('SwiftCodesService', () => {
  let service: SwiftCodesService;
  let model: {
    findOne: jest.Mock;
    find: jest.Mock;
    deleteOne: jest.Mock;
    new: jest.Mock;
  };

  const mockSwiftCode = {
    swiftCode: 'BREXPLPWXXX',
    bankName: 'Example Bank',
    countryISO2: 'PL',
  };

  beforeEach(async () => {
    const mockModel = {
      findOne: jest.fn(),
      find: jest.fn(),
      deleteOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SwiftCodesService,
        {
          provide: getModelToken(SwiftCode.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<SwiftCodesService>(SwiftCodesService);
    model = module.get(getModelToken(SwiftCode.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getSwiftCodeDetails', () => {
    it('should return a SWIFT code when it exists', async () => {
      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockSwiftCode),
      });

      const result = await service.getSwiftCodeDetails('BREXPLPWXXX');

      expect(model.findOne).toHaveBeenCalledWith({
        swiftCode: 'BREXPLPWXXX',
      });
      expect(result).toEqual(mockSwiftCode);
    });

    it('should throw NotFoundException when SWIFT code does not exist', async () => {
      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.getSwiftCodeDetails('UNKNOWN123')).rejects.toThrow(
        NotFoundException,
      );

      expect(model.findOne).toHaveBeenCalledWith({
        swiftCode: 'UNKNOWN123',
      });
    });
  });

  describe('getSwiftCodesByCountry', () => {
    it('should return SWIFT codes for a country', async () => {
      const swiftCodes = [
        mockSwiftCode,
        {
          swiftCode: 'ABCDPLPWXXX',
          bankName: 'Another Bank',
          countryISO2: 'PL',
        },
      ];

      model.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(swiftCodes),
      });

      const result = await service.getSwiftCodesByCountry('PL');

      expect(model.find).toHaveBeenCalledWith({
        countryISO2: 'PL',
      });
      expect(result).toEqual(swiftCodes);
    });

    it('should throw NotFoundException when no SWIFT codes are found', async () => {
      model.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      });

      await expect(service.getSwiftCodesByCountry('XX')).rejects.toThrow(
        NotFoundException,
      );

      expect(model.find).toHaveBeenCalledWith({
        countryISO2: 'XX',
      });
    });
  });

  describe('addSwiftCode', () => {
    it('should add a new SWIFT code', async () => {
      const dto = {
        swiftCode: 'NEWPLPWXXX',
        bankName: 'New Bank',
        address: 'Test Street 1',
        countryISO2: 'PL',
        countryName: 'Poland',
        isHeadquarter: true,
      };

      const save = jest.fn().mockResolvedValue(dto);

      const mockConstructor = jest.fn().mockImplementation(() => ({
        save,
      }));

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          SwiftCodesService,
          {
            provide: getModelToken(SwiftCode.name),
            useValue: mockConstructor,
          },
        ],
      }).compile();

      const testService = module.get<SwiftCodesService>(SwiftCodesService);

      const result = await testService.addSwiftCode(dto);

      expect(mockConstructor).toHaveBeenCalledWith(dto);
      expect(save).toHaveBeenCalled();
      expect(result).toEqual({
        message: 'SWIFT code successfully added',
      });
    });
  });

  describe('deleteSwiftCode', () => {
    it('should delete an existing SWIFT code', async () => {
      model.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          deletedCount: 1,
        }),
      });

      const result = await service.deleteSwiftCode('BREXPLPWXXX');

      expect(model.deleteOne).toHaveBeenCalledWith({
        swiftCode: 'BREXPLPWXXX',
      });
      expect(result).toEqual({
        message: 'SWIFT code BREXPLPWXXX successfully deleted',
      });
    });

    it('should throw NotFoundException when SWIFT code does not exist', async () => {
      model.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          deletedCount: 0,
        }),
      });

      await expect(service.deleteSwiftCode('UNKNOWN123')).rejects.toThrow(
        NotFoundException,
      );

      expect(model.deleteOne).toHaveBeenCalledWith({
        swiftCode: 'UNKNOWN123',
      });
    });
  });
});
