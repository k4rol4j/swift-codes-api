import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSwiftCodeDto {
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  readonly bankName: string;

  @IsString()
  @Length(2, 2)
  readonly countryISO2: string;

  @IsString()
  @IsNotEmpty()
  readonly countryName: string;

  @IsBoolean()
  readonly isHeadquarter: boolean;

  @IsString()
  @IsNotEmpty()
  readonly swiftCode: string;
}
