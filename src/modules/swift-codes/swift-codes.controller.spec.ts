/* eslint-disable @typescript-eslint/unbound-method */

import { Test, TestingModule } from '@nestjs/testing';
import { SwiftCodesController } from './swift-codes.controller';
import { SwiftCodesService } from './swift-codes.service';
import { SwiftCode } from './schemas/swift-code.schema';

describe('SwiftCodesController', () => {
  let controller: SwiftCodesController;
  let service: jest.Mocked<SwiftCodesService>;

  beforeEach(async () => {
    const mockSwiftCodesService = {
      getSwiftCodeDetails: jest.fn(),
      getSwiftCodesByCountry: jest.fn(),
      addSwiftCode: jest.fn(),
      deleteSwiftCode: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwiftCodesController],
      providers: [
        {
          provide: SwiftCodesService,
          useValue: mockSwiftCodesService,
        },
      ],
    }).compile();

    controller = module.get<SwiftCodesController>(SwiftCodesController);
    service = module.get(SwiftCodesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSwiftCodeDetails', () => {
    it('should return a SWIFT code', async () => {
      const swiftCode: SwiftCode = {
        swiftCode: 'BREXPLPWXXX',
        bankName: 'Example Bank',
        countryISO2: 'PL',
        address: 'Test Street 1',
        countryName: 'Poland',
        isHeadquarter: true,
      };

      service.getSwiftCodeDetails.mockResolvedValue(swiftCode);

      const result = await controller.getSwiftCodeDetails('BREXPLPWXXX');

      expect(service.getSwiftCodeDetails).toHaveBeenCalledWith('BREXPLPWXXX');
      expect(result).toEqual(swiftCode);
    });
  });

  describe('getSwiftCodesByCountry', () => {
    it('should return SWIFT codes for a country', async () => {
      const swiftCodes: SwiftCode[] = [
        {
          swiftCode: 'BREXPLPWXXX',
          bankName: 'Example Bank',
          countryISO2: 'PL',
          address: 'Test Street 1',
          countryName: 'Poland',
          isHeadquarter: true,
        },
      ];

      service.getSwiftCodesByCountry.mockResolvedValue(swiftCodes);

      const result = await controller.getSwiftCodesByCountry('PL');

      expect(service.getSwiftCodesByCountry).toHaveBeenCalledWith('PL');
      expect(result).toEqual(swiftCodes);
    });
  });

  describe('addSwiftCode', () => {
    it('should add a SWIFT code', async () => {
      const dto = {
        swiftCode: 'NEWPLPWXXX',
        bankName: 'New Bank',
        address: 'Test Street 1',
        countryISO2: 'PL',
        countryName: 'Poland',
        isHeadquarter: true,
      };

      const response = {
        message: 'SWIFT code successfully added',
      };

      service.addSwiftCode.mockResolvedValue(response);

      const result = await controller.addSwiftCode(dto);

      expect(service.addSwiftCode).toHaveBeenCalledWith(dto);
      expect(result).toEqual(response);
    });
  });

  describe('deleteSwiftCode', () => {
    it('should delete a SWIFT code', async () => {
      const response = {
        message: 'SWIFT code BREXPLPWXXX successfully deleted',
      };

      service.deleteSwiftCode.mockResolvedValue(response);

      const result = await controller.deleteSwiftCode('BREXPLPWXXX');

      expect(service.deleteSwiftCode).toHaveBeenCalledWith('BREXPLPWXXX');
      expect(result).toEqual(response);
    });
  });
});
