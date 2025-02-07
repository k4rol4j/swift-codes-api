import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SwiftCodesService } from './swift-codes.service';
import { CreateSwiftCodeDto } from './dto/create-swift-code.dto';
import { SwiftCode } from './schemas/swift-code.schema';

@Controller('v1/swift-codes')
export class SwiftCodesController {
  constructor(private readonly swiftCodesService: SwiftCodesService) {}

  // Endpoint 1: Pobiera dane dla pojedynczego SWIFT kodu
  @Get(':swiftCode')
  async getSwiftCodeDetails(
    @Param('swiftCode') swiftCode: string,
  ): Promise<SwiftCode> {
    return this.swiftCodesService.getSwiftCodeDetails(swiftCode);
  }

  // Endpoint 2: Pobiera wszystkie kody SWIFT dla kraju
  @Get('country/:countryISO2code')
  async getSwiftCodesByCountry(
    @Param('countryISO2code') countryISO2code: string,
  ): Promise<SwiftCode[]> {
    return this.swiftCodesService.getSwiftCodesByCountry(countryISO2code);
  }

  // Endpoint 3: Dodaje nowy kod SWIFT
  @Post()
  async addSwiftCode(
    @Body() createSwiftCodeDto: CreateSwiftCodeDto,
  ): Promise<{ message: string }> {
    return this.swiftCodesService.addSwiftCode(createSwiftCodeDto);
  }

  // Endpoint 4: Usuwa kod SWIFT
  @Delete(':swiftCode')
  async deleteSwiftCode(
    @Param('swiftCode') swiftCode: string,
  ): Promise<{ message: string }> {
    return this.swiftCodesService.deleteSwiftCode(swiftCode);
  }
}
