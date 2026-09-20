# 💰 Personal Finance Tracker

A full-stack personal finance tracker that lets you log income and expenses and see a live dashboard of your financial position. Built as a portfolio project to demonstrate end-to-end full-stack development — a REST API backed by a relational database, and a modern React/TypeScript frontend consuming it.

## Overview

Users can add transactions (income or expenses), categorize them, and instantly see an updated dashboard showing total income, total expenses, and remaining balance — all calculated live from real data stored in PostgreSQL.

## Screenshots

> _Add a screenshot or short GIF of the dashboard and form here._
>
> `![Dashboard](./screenshots/dashboard.png)`

## Features

- Add transactions with description, amount, category, and type (income/expense)
- Live dashboard: total income, total expenses, and remaining balance, calculated automatically
- Full CRUD REST API (create, read, update, delete transactions)
- Server-side input validation (required fields, positive amounts only)
- Type-safe frontend, with TypeScript types mirroring the backend's data model

## Tech Stack

**Backend**
- C# / ASP.NET Core Web API (.NET 8)
- Entity Framework Core (Code-First, with migrations)
- PostgreSQL
- Swagger / OpenAPI for interactive API documentation

**Frontend**
- React 18 + TypeScript
- Vite (build tool / dev server)
- Tailwind CSS

**Tooling**
- Git & GitHub, with incremental commit history
- .NET User Secrets for local credential management (no secrets committed to source control)

## Architecture

```
React (TypeScript, Vite)
        ↓  fetch (HTTPS + JSON)
ASP.NET Core Web API
        ↓
Entity Framework Core
        ↓
PostgreSQL
```

The frontend and backend are two independent applications communicating over HTTP — a common pattern in modern web development, as opposed to a server rendering pages directly.

## Database Design

**Transactions table**

| Column | Type | Notes |
|---|---|---|
| Id | int | Primary key, auto-generated |
| Description | varchar(100) | Required |
| Amount | decimal | Required, must be greater than 0 |
| Type | int | 0 = Income, 1 = Expense |
| Category | varchar(50) | Required |
| DateTime | timestamp | |

## API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/transactions` | Get all transactions |
| GET | `/api/transactions/{id}` | Get a single transaction |
| POST | `/api/transactions` | Create a new transaction |
| PUT | `/api/transactions/{id}` | Update an existing transaction |
| DELETE | `/api/transactions/{id}` | Delete a transaction |

Interactive API documentation is available via Swagger UI at `/swagger` when the backend is running.

## How to Run

### Prerequisites
- .NET 8 SDK
- Node.js (LTS)
- PostgreSQL

### Backend
```bash
cd FinanceTracker.Api
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=financetracker;Username=postgres;Password=YOUR_PASSWORD"
dotnet ef database update
dotnet run
```
The API will start on `https://localhost:7055` (or similar — check the console output), with Swagger UI available at `/swagger`.

### Frontend
```bash
cd finance-tracker-frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

> Note: on first run, you may need to open the backend's HTTPS URL directly in your browser once and accept the self-signed development certificate, or the frontend's requests to the API will fail silently.

## What I Learned

- Building a REST API from scratch with ASP.NET Core, including routing, controllers, and dependency injection
- Using Entity Framework Core's Code-First workflow — modeling data as C# classes and generating/applying database migrations, rather than designing the database schema by hand first
- Configuring CORS correctly to allow a separately-hosted frontend to call the API
- Keeping credentials out of source control using .NET User Secrets, instead of relying on `.gitignore` alone
- Core React concepts: components, props, state (`useState`), and side effects (`useEffect`) for data fetching
- TypeScript's distinction between compile-time types and runtime values, and patterns for writing enum-like constructs that survive strict "erasable syntax" compilation settings
- Building controlled forms in React and communicating from child to parent components via callback props
- Debugging real compiler and runtime errors by reading error messages closely, rather than guessing — including CORS issues, self-signed certificate trust problems, and TypeScript type-checking errors

## Future Improvements

- User authentication (register/login with JWT), so transactions are scoped per user rather than global
- Categories as a proper related database entity, rather than a free-text field
- Monthly budgets per category, with progress indicators
- Filtering and searching transactions by date range and category
- Automated tests (unit tests for the API, component tests for the frontend)
- Deployment (e.g. the API to a cloud host, the frontend to a static host)
