/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { AppModule } from './../src/app.module';

describe('Swift Codes API (e2e)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;

  const testSwiftCode = {
    swiftCode: 'TESTPLPWXXX',
    bankName: 'Test Bank',
    address: 'Test Street 1',
    countryISO2: 'PL',
    countryName: 'Poland',
    isHeadquarter: true,
  };

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    process.env.MONGODB_URI = mongoServer.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await mongoose.disconnect();
    await mongoServer.stop();

    delete process.env.MONGODB_URI;
  });

  describe('POST /v1/swift-codes', () => {
    it('should create a new SWIFT code', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/swift-codes')
        .send(testSwiftCode)
        .expect(201);

      expect(response.body).toEqual({
        message: 'SWIFT code successfully added',
      });
    });

    it('should return 400 when swiftCode is empty', async () => {
      const invalidSwiftCode = {
        ...testSwiftCode,
        swiftCode: '',
      };

      const response = await request(app.getHttpServer())
        .post('/v1/swift-codes')
        .send(invalidSwiftCode)
        .expect(400);

      expect(response.body.statusCode).toBe(400);
    });

    it('should return 400 when countryISO2 has invalid length', async () => {
      const invalidCountryCode = {
        ...testSwiftCode,
        countryISO2: 'P',
      };

      const response = await request(app.getHttpServer())
        .post('/v1/swift-codes')
        .send(invalidCountryCode)
        .expect(400);

      expect(response.body.statusCode).toBe(400);
    });

    it('should return 400 when bankName is missing', async () => {
      const invalidData = {
        ...testSwiftCode,
        bankName: undefined,
      };

      const response = await request(app.getHttpServer())
        .post('/v1/swift-codes')
        .send(invalidData)
        .expect(400);

      expect(response.body.statusCode).toBe(400);
    });

    it('should return 400 when isHeadquarter is not a boolean', async () => {
      const invalidData = {
        ...testSwiftCode,
        isHeadquarter: 'true',
      };

      const response = await request(app.getHttpServer())
        .post('/v1/swift-codes')
        .send(invalidData)
        .expect(400);

      expect(response.body.statusCode).toBe(400);
    });

    it('should return 400 when request contains an unknown field', async () => {
      const invalidData = {
        ...testSwiftCode,
        unknownField: 'should not be accepted',
      };

      const response = await request(app.getHttpServer())
        .post('/v1/swift-codes')
        .send(invalidData)
        .expect(400);

      expect(response.body.statusCode).toBe(400);
    });
  });

  describe('GET /v1/swift-codes/:swiftCode', () => {
    it('should return a SWIFT code', async () => {
      const response = await request(app.getHttpServer())
        .get('/v1/swift-codes/TESTPLPWXXX')
        .expect(200);

      expect(response.body.swiftCode).toBe('TESTPLPWXXX');
      expect(response.body.bankName).toBe('Test Bank');
      expect(response.body.countryISO2).toBe('PL');
    });

    it('should return 404 for an unknown SWIFT code', async () => {
      const response = await request(app.getHttpServer())
        .get('/v1/swift-codes/UNKNOWN123')
        .expect(404);

      expect(response.body.statusCode).toBe(404);
    });
  });

  describe('GET /v1/swift-codes/country/:countryISO2code', () => {
    it('should return SWIFT codes for a country', async () => {
      const response = await request(app.getHttpServer())
        .get('/v1/swift-codes/country/PL')
        .expect(200);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            swiftCode: 'TESTPLPWXXX',
            countryISO2: 'PL',
          }),
        ]),
      );
    });

    it('should return 404 for a country without SWIFT codes', async () => {
      const response = await request(app.getHttpServer())
        .get('/v1/swift-codes/country/XX')
        .expect(404);

      expect(response.body.statusCode).toBe(404);
    });
  });

  describe('DELETE /v1/swift-codes/:swiftCode', () => {
    it('should delete an existing SWIFT code', async () => {
      const response = await request(app.getHttpServer())
        .delete('/v1/swift-codes/TESTPLPWXXX')
        .expect(200);

      expect(response.body).toEqual({
        message: 'SWIFT code TESTPLPWXXX successfully deleted',
      });
    });

    it('should return 404 when deleting an unknown SWIFT code', async () => {
      const response = await request(app.getHttpServer())
        .delete('/v1/swift-codes/UNKNOWN123')
        .expect(404);

      expect(response.body.statusCode).toBe(404);
    });
  });
});
