import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SwiftCodesController } from './swift-codes.controller';
import { SwiftCodesService } from './swift-codes.service';
import { SwiftCode, SwiftCodeSchema } from './schemas/swift-code.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SwiftCode.name, schema: SwiftCodeSchema },
    ]),
  ],
  controllers: [SwiftCodesController],
  providers: [SwiftCodesService],
})
export class SwiftCodesModule {}
