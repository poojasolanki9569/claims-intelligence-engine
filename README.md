
# Claims Intelligence Engine

A full-stack Proof of Concept (POC) for assessing whether a proposed product claim is supported by the provided scientific evidence.

The application allows a user to submit product information, a proposed claim, and supporting evidence. The backend uses OpenAI to evaluate the relationship between the claim and evidence and returns a structured assessment.

## Features

- Product claim assessment
- AI-powered evaluation using OpenAI
- Structured assessment response
- Form validation
- Loading and error handling
- PostgreSQL data persistence
- REST API integration between frontend and backend

## Technology Stack

### Frontend

- React
- TypeScript
- Atomic Design-inspired component structure

### Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- OpenAI API

## Project Structure

```text
loreal-claims-engine/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── src/
│   ├── .env.example
│   └── package.json
│
├── claim-engine-frontend/
│   ├── src/
│   │   └── features/
│   │       └── claims/
│   │           ├── atoms/
│   │           ├── molecules/
│   │           ├── organisms/
│   │           ├── pages/
│   │           ├── templates/
│   │           ├── hooks/
│   │           ├── services/
│   │           ├── types/
│   │           └── styles/
│   │
│   └── package.json
│
└── README.md
```

## Application Flow

```text
User
  │
  ▼
React Frontend
  │
  │ POST /api/claims/assess
  ▼
NestJS Backend
  │
  ├── Validate Request
  │
  ├── Send Claim + Evidence to OpenAI
  │
  ├── Receive Structured Assessment
  │
  └── Save Data
        │
        ▼
    PostgreSQL Database
  │
  ▼
Assessment Response
  │
  ▼
React Frontend
```

## Assessment Input

The user provides:

- Product Name
- Formula Description
- Proposed Claim
- Scientific Evidence

Example:

```text
Product Name:
HydraGlow Hyaluronic Acid Serum

Formula Description:
A hydrating serum containing hyaluronic acid, glycerin and vitamin B5.

Proposed Claim:
Increases skin hydration by 30% within 7 days.

Scientific Evidence:
A clinical study conducted on participants showed an average increase in skin hydration after regular use.
```

## Assessment Response

The API returns a structured response containing:

- Claim ID
- Whether the claim is justified
- Confidence score
- AI-generated reasoning

Example:

```json
{
  "claimId": "example-claim-id",
  "assessment": {
    "justified": false,
    "confidenceScore": 96,
    "reasoning": "The provided evidence does not fully support the proposed claim."
  }
}
```

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- PostgreSQL

You will also need an OpenAI API key.

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file.

Example:

```env
DATABASE_URL="your_postgresql_connection_string"
OPENAI_API_KEY="your_openai_api_key"
```

Apply Prisma migrations:

```bash
npx prisma migrate deploy
```

Generate Prisma Client:

```bash
npx prisma generate
```

Start the backend:

```bash
npm run start:dev
```

The backend runs on:

```text
http://localhost:3000
```

## Frontend Setup

Navigate to the frontend directory:

```bash
cd claim-engine-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## API Endpoint

### Assess a Claim

**Endpoint:**

```text
POST /api/claims/assess
```

**Request Body:**

```json
{
  "productName": "HydraGlow Hyaluronic Acid Serum",
  "formulaDescription": "A hydrating serum containing hyaluronic acid.",
  "claimText": "Increases skin hydration by 30% within 7 days.",
  "evidenceText": "Clinical study results and supporting scientific evidence."
}
```

## Frontend Validation

The form validates:

- Required fields
- Empty or whitespace-only values
- Product name maximum length
- Formula description maximum length

Validation errors are displayed below the corresponding form field.

The **Assess Claim** button remains disabled until all required fields contain valid data.

## CORS Configuration

The backend allows requests from the local frontend development server:

```text
http://localhost:5173
```

This allows the React application to communicate with the NestJS API during local development.

## Database

The application stores:

### Claim

- Product information
- Formula description
- Proposed claim
- Creation date

### Assessment

- Associated claim
- Scientific evidence
- Justification result
- Confidence score
- AI reasoning
- Creation date

The database schema and Prisma migration files are included in the repository so the database structure can be recreated locally.

## Security

The following files should not be committed to GitHub:

```text
.env
node_modules/
dist/
```

Never expose:

- OpenAI API keys
- Database passwords
- Production credentials

Use `.env.example` files with placeholder values for required environment variables.

## Build Frontend

To create a production build:

```bash
cd claim-engine-frontend
npm run build
```

Vite generates the production-ready frontend files inside:

```text
dist/
```

## Disclaimer

The AI-generated assessment is intended as a technical POC and should not be considered a final scientific, legal, regulatory, or compliance decision. Human review should be performed before using an assessment for an actual product claim.