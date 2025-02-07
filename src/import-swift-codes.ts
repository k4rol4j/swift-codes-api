import { SwiftCodeSchema } from './modules/swift-codes/schemas/swift-code.schema';
import * as mongoose from 'mongoose';
import * as XLSX from 'xlsx';

async function importData() {
  const uri = 'mongodb://127.0.0.1:27017/swiftcodes';
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const SwiftCodeModel = mongoose.model('SwiftCode', SwiftCodeSchema);

  const filePath =
    'C:/Users/karol/Desktop/praktyki/remitly/task1/Interns_2025_SWIFT_CODES.xlsx';
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  const swiftCodes = jsonData.map((row: any) => ({
    countryISO2: row['COUNTRY ISO2 CODE'],
    swiftCode: row['SWIFT CODE'],
    codeType: row['CODE TYPE'], // Dodajemy CODE TYPE
    bankName: row['NAME'],
    address: row['ADDRESS'],
    townName: row['TOWN NAME'],
    countryName: row['COUNTRY NAME'],
    timeZone: row['TIME ZONE'],
    isHeadquarter: row['SWIFT CODE'].endsWith('XXX'),
  }));

  console.log(swiftCodes);

  await SwiftCodeModel.deleteMany({});
  console.log('Old data removed');
  await SwiftCodeModel.insertMany(swiftCodes);
  console.log('New data inserted');
  console.log('Data inserted');

  await mongoose.disconnect();
  console.log('MongoDB connection closed');
}

importData().catch((err) => console.error(err));
