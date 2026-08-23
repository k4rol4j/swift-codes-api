import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class SwiftCode {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  bankName: string;

  @Prop({ required: true, uppercase: true })
  countryISO2: string;

  @Prop({ required: true })
  countryName: string;

  @Prop({ required: true })
  isHeadquarter: boolean;

  @Prop({ required: true, unique: true })
  swiftCode: string;
}

export type SwiftCodeDocument = HydratedDocument<SwiftCode>;

export const SwiftCodeSchema = SchemaFactory.createForClass(SwiftCode);
