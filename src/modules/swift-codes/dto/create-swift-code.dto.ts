export class CreateSwiftCodeDto {
  readonly address: string;
  readonly bankName: string;
  readonly countryISO2: string;
  readonly countryName: string;
  readonly isHeadquarter: boolean;
  readonly swiftCode: string;
}
