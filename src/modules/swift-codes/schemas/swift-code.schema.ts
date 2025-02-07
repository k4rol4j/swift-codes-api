import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SwiftCode extends Document {
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

// Poprawna deklaracja typu
export type SwiftCodeDocument = SwiftCode & Document;

// Tworzenie schematu Mongoose
export const SwiftCodeSchema = SchemaFactory.createForClass(SwiftCode);
