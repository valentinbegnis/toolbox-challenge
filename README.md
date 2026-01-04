# Toolbox Challenge

## Quick start (Docker)

```bash
cp .env.example .env # Make sure to provide valid values
docker compose up --build
```

This will start:
- API      -> `http://localhost:3001`
- Frontend -> `http://localhost:3000`

### Docker Compose files

- docker-compose.yml     -> production-like setup
- docker-compose.dev.yml -> development setup with hot reload for both API and frontend

## Local development (without Docker)

### 1. API (Using Node.js v14.21.3)

```bash
cd api
cp .env.example .env # Make sure to provide valid values
npm install
npm run dev
```

Runs on: http://localhost:3001

### 2. Frontend (Using Node.js v16.20.2)

```bash
cd web
cp .env.example .env # Make sure to provide valid values
npm install
npm start
```

Runs on: http://localhost:3000

## Environment variables

This project uses different `.env` files depending on the execution context:

- `api/.env`    -> local API development (without Docker)
- `web/.env`    -> local frontend development (without Docker)
- `.env` (root) -> Docker Compose environment for running the full stack

This separation allows each service to run independently in local development,
while Docker Compose manages configuration for the full system.

## Data validation rules

When processing CSV files from the external API, the application strictly follows
the format defined in the challenge specification.

Each CSV line is considered **valid** only if it meets all of the following criteria:

- The line contains exactly 4 columns: `file`, `text`, `number`, `hex`
- `text` is a non-empty string
- `number` is a finite numeric value
- `hex` is a hexadecimal string of **exactly 32 characters**

Although the external API may return lines where the `hex` field has fewer than
32 characters, those lines are treated as **invalid** and are discarded to ensure the output follows the specification.

Files that do not contain any valid lines are also excluded from the final response.

## API overview

- Built with Express 4.18.2
- `GET /files/data` endpoint that parses and validates CSV data from the external API
  - Supports optional filtering by `fileName` (partial and case-insensitive matching)
- `GET /files/list` endpoint that exposes the raw file list

## Frontend overview

- Built with React 18.2.0 (functional components + hooks)
- UI implemented using React Bootstrap
- Global data state managed with Redux Toolkit
- API calls handled using Redux Async Thunk
- Search input:
  - debounced (400 ms) to avoid excessive API calls
  - supports partial file name matching
- Handles loading and error states

## Testing

### API

- Tested using Mocha + Chai
- External API calls mocked with Nock

```bash
cd api
npm test
```

### Frontend

- Tested using Jest + React Testing Library


```bash
cd api
npm test
```
