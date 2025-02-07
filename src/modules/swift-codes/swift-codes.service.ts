import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSwiftCodeDto } from './dto/create-swift-code.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SwiftCode, SwiftCodeDocument } from './schemas/swift-code.schema';

@Injectable()
export class SwiftCodesService {
  constructor(
    @InjectModel(SwiftCode.name)
    private readonly swiftCodeModel: Model<SwiftCodeDocument>,
  ) {}

  // Pobieranie danych SWIFT na podstawie kodu
  async getSwiftCodeDetails(swiftCode: string): Promise<SwiftCode> {
    const swift = await this.swiftCodeModel.findOne({ swiftCode }).exec();

    if (!swift) {
      throw new NotFoundException(`SWIFT code ${swiftCode} not found`);
    }

    return swift;
  }

  // Pobieranie wszystkich kodów SWIFT dla danego kraju
  async getSwiftCodesByCountry(countryISO2: string): Promise<SwiftCode[]> {
    const swifts = await this.swiftCodeModel.find({ countryISO2 }).exec();

    if (swifts.length === 0) {
      throw new NotFoundException(
        `No SWIFT codes found for country ${countryISO2}`,
      );
    }

    return swifts;
  }

  // Dodawanie nowego kodu SWIFT
  async addSwiftCode(
    createSwiftCodeDto: CreateSwiftCodeDto,
  ): Promise<{ message: string }> {
    const createdSwiftCode = new this.swiftCodeModel(createSwiftCodeDto);
    await createdSwiftCode.save();
    return { message: 'SWIFT code successfully added' };
  }

  // Usuwanie kodu SWIFT
  async deleteSwiftCode(swiftCode: string): Promise<{ message: string }> {
    const result = await this.swiftCodeModel.deleteOne({ swiftCode }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`SWIFT code ${swiftCode} not found`);
    }

    return { message: `SWIFT code ${swiftCode} successfully deleted` };
  }
}
