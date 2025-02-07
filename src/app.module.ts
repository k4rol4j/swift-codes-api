import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SwiftCodesModule } from './modules/swift-codes/swift-codes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/swiftcodes'),
    SwiftCodesModule,
  ],
})
export class AppModule {}
