# SWIFT Codes API

REST API for managing and retrieving SWIFT/BIC bank codes.

The application was developed using NestJS, TypeScript, MongoDB and Mongoose. It provides endpoints for retrieving SWIFT codes by code or country, adding new records, and deleting existing records.

## Tech Stack

- TypeScript
- NestJS
- Node.js
- MongoDB
- Mongoose
- Jest
- Supertest
- class-validator

## Features

- Retrieve details of a SWIFT/BIC code
- Retrieve all SWIFT codes for a specific country
- Add a new SWIFT code
- Delete an existing SWIFT code
- Import SWIFT code data from an Excel file
- Request validation
- Unit and end-to-end tests

## API Endpoints

Base path: `/v1/swift-codes`

### Get SWIFT code details

`GET /v1/swift-codes/:swiftCode`

Returns information about a specific SWIFT code.

Example: `GET /v1/swift-codes/TESTPLPWXXX`

### Get SWIFT codes by country

`GET /v1/swift-codes/country/:countryISO2code`

Returns all SWIFT codes associated with a given country.

Example: `GET /v1/swift-codes/country/PL`

### Add a SWIFT code

`POST /v1/swift-codes`

Adds a new SWIFT code to the database.

Example request:

```json
{
  "address": "Example Street 1, Krakow",
  "bankName": "Example Bank",
  "countryISO2": "PL",
  "countryName": "Poland",
  "isHeadquarter": true,
  "swiftCode": "TESTPLPWXXX"
}
```

### Delete a SWIFT code

`DELETE /v1/swift-codes/:swiftCode`

Deletes a SWIFT code from the database.

If the requested SWIFT code does not exist, the API returns `404 Not Found`.

## Validation

The API validates incoming POST requests using NestJS `ValidationPipe` and `class-validator`.

The following validation rules are applied:

- Required fields cannot be empty
- `countryISO2` must contain exactly 2 characters
- `isHeadquarter` must be a boolean
- Unknown request fields are rejected
- Invalid requests return `400 Bad Request`

## Project Structure

```
swift-codes-api/
├── data/
│   └── Interns_2025_SWIFT_CODES.xlsx
├── src/
│   ├── modules/
│   │   └── swift-codes/
│   │       ├── dto/
│   │       │   └── create-swift-code.dto.ts
│   │       ├── schemas/
│   │       │   └── swift-code.schema.ts
│   │       ├── swift-codes.controller.ts
│   │       ├── swift-codes.service.ts
│   │       └── swift-codes.module.ts
│   ├── import-swift-codes.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── package.json
├── README.md
└── ...
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

Clone the repository:

```bash
git clone https://github.com/k4rol4j/swift-codes-api.git
cd swift-codes-api
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```
MONGODB_URI=mongodb://127.0.0.1:27017/swiftcodes
SWIFT_CODES_FILE=./data/Interns_2025_SWIFT_CODES.xlsx
```

If the environment variables are not provided, the application uses local MongoDB and the default Excel file path.

### Running the Application

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run build
npm run start:prod
```

The API is available at `http://localhost:8080`.

### Importing SWIFT Codes

The repository contains an Excel file with SWIFT code data: `data/Interns_2025_SWIFT_CODES.xlsx`

To import the data into MongoDB:

```bash
npm run import
```

The import replaces existing SWIFT code records with the data from the Excel file.

### Testing

Run unit tests:

```bash
npm test
```

Run unit tests in watch mode:

```bash
npm run test:watch
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Generate test coverage:

```bash
npm run test:cov
```

## Author

Karolina Jędryczka