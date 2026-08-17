# SWIFT Codes API

REST API for managing and retrieving SWIFT/BIC bank codes.

The application was developed using **NestJS**, **TypeScript**, **MongoDB** and **Mongoose**. It provides endpoints for retrieving SWIFT codes by code or country, adding new records, and deleting existing records.

## Tech Stack

- TypeScript
- NestJS
- Node.js
- MongoDB
- Mongoose
- Jest
- Supertest

## Features

- Retrieve details of a SWIFT/BIC code
- Retrieve all SWIFT codes for a specific country
- Add a new SWIFT code
- Delete an existing SWIFT code
- Import SWIFT code data from an Excel file
- Unit and end-to-end tests

## API Endpoints

Base path:

    /v1/swift-codes

### Get SWIFT code details

    GET /v1/swift-codes/:swiftCode

Returns information about a specific SWIFT code.

### Get SWIFT codes by country

    GET /v1/swift-codes/country/:countryISO2code

Returns all SWIFT codes associated with a given country.

Example:

    GET /v1/swift-codes/country/PL

### Add a SWIFT code

    POST /v1/swift-codes

Adds a new SWIFT code to the database.

### Delete a SWIFT code

    DELETE /v1/swift-codes/:swiftCode

Deletes a SWIFT code from the database.

If the requested SWIFT code does not exist, the API returns a `404 Not Found` response.

## Project Structure

    swift-codes-api/
    ├── src/
    │   ├── modules/
    │   │   └── swift-codes/
    │   │       ├── dto/
    │   │       ├── schemas/
    │   │       ├── swift-codes.controller.ts
    │   │       ├── swift-codes.service.ts
    │   │       └── swift-codes.module.ts
    │   ├── import-swift-codes.ts
    │   ├── app.module.ts
    │   └── main.ts
    ├── test/
    ├── Interns_2025_SWIFT_CODES.xlsx
    ├── package.json
    └── README.md

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

Clone the repository:

    git clone https://github.com/k4rol4j/swift-codes-api.git
    cd swift-codes-api

Install dependencies:

    npm install

### Running the application

Development mode:

    npm run start:dev

Production mode:

    npm run build
    npm run start:prod

## Testing

Run unit tests:

    npm test

Run tests in watch mode:

    npm run test:watch

Run end-to-end tests:

    npm run test:e2e

Generate test coverage:

    npm run test:cov

## Data

The repository contains an Excel file with SWIFT code data:

    Interns_2025_SWIFT_CODES.xlsx

The project also includes a dedicated script for importing SWIFT code data into MongoDB.

## Author

**Karolina Jędryczka**
