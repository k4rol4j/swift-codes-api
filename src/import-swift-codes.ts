import * as mongoose from 'mongoose';
import * as XLSX from 'xlsx';

import { SwiftCodeSchema } from './modules/swift-codes/schemas/swift-code.schema';

const MONGODB_URI =
  process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/swiftcodes';

const EXCEL_FILE_PATH =
  process.env.SWIFT_CODES_FILE ?? './data/Interns_2025_SWIFT_CODES.xlsx';

async function importData(): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const SwiftCodeModel = mongoose.model('SwiftCode', SwiftCodeSchema);

    const workbook = XLSX.readFile(EXCEL_FILE_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    if (!sheet) {
      throw new Error('Excel file does not contain any worksheets');
    }

    const jsonData = XLSX.utils.sheet_to_json<Record<string, string>>(sheet);

    const swiftCodes = jsonData.map((row) => ({
      countryISO2: row['COUNTRY ISO2 CODE'],
      swiftCode: row['SWIFT CODE'],
      bankName: row['NAME'],
      address: row['ADDRESS'],
      countryName: row['COUNTRY NAME'],
      isHeadquarter: row['SWIFT CODE']?.endsWith('XXX') ?? false,
    }));

    console.log(`Found ${swiftCodes.length} SWIFT codes`);

    await SwiftCodeModel.deleteMany({});
    console.log('Old data removed');

    await SwiftCodeModel.insertMany(swiftCodes);
    console.log(`${swiftCodes.length} SWIFT codes inserted`);
  } catch (error) {
    console.error('Failed to import SWIFT codes:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB connection closed');
  }
}

void importData();
