🗳️ Voting App — High-Throughput, Role-Based, Microservices

A production-minded voting application designed to handle bursty traffic (many requests in short time). It supports two roles — admin and user — and is built with a microservice architecture to scale reads/writes independently.
Inspired by the Romanian presidential election, 2025.

✨ Features

- High-throughput vote intake with back-pressure and async processing
- Roles & auth: admin and user (JWT + Passport)
- Separated concerns:
    - Vote Submission (write-heavy)
    - Vote Options (CRUD)
    - Vote Results (read/aggregate-heavy)
- API Gateway for a single entry point, rate-limiting, and auth
- Event-driven via RabbitMQ for decoupled services
- Polyglot persistence:
    - MySQL for users/auth & relational data
    - MongoDB for vote events / fast aggregations
- Docker Compose for local dev
- Health checks, structured logs
- Ready for k6 load testing & Jest unit tests

Architecture (overview)
           ┌──────────────────┐
           │    Clients       │
           │ (Web/CLI/Apps)   │
           └───────┬──────────┘
                   │  HTTP (REST)
             ┌─────▼─────┐
             │  Gateway  │  AuthN/Z, rate limit, routing
             └─┬───────┬─┘
       RPC/TCP │       │ HTTP/REST
               │       │
         ┌─────▼───┐  ┌▼────────────────┐
         │  Auth   │  │ Voting Options  │  (CRUD options)
         └────┬────┘  └─────────────────┘
              │ issues JWT
              │
      ┌───────▼────────┐
      │  Users Service  │  (profile/roles)
      └─────────────────┘

   Async (RabbitMQ)
      ┌─────────────────────────────────────────────────────────┐
      │        exchange: votes    queue: votes.events           │
      └──────────────┬───────────────────────────┬─────────────┘
                     │                           │
             ┌───────▼────────┐           ┌──────▼───────────┐
             │ Voting Executor │           │ Voting Results   │ (counters, read models)
             └─────────────────┘           └──────────────────┘

Storage:
- MySQL (users/auth)     - MongoDB (votes, aggregates)

🧰 Tech Stack

- Node.js + TypeScript + NestJS
- RabbitMQ (AMQP) for events
- MySQL 8 (users, auth)
- MongoDB 6 (votes + aggregations)
- Docker Compose for local orchestration
- Jest (unit/integration), k6 (load testing)

Start everything
- docker compose up --build -d

📦 Services (folders)

- gateway/ — public REST API, JWT verification, rate limiting, routes to other services
- auth/ — login, token issuing, strategies (Local/JWT), role checks
- users/ — user profiles, role management (admin/user)
- voting-executor/ — receives vote submissions, validates, publishes to RabbitMQ
- voting-options/ — admin CRUD for options/categories
- voting-results/ — consumes vote events, maintains counters/aggregates, serves read queries

Infra:

- mysql — users/auth data
- mongodb — vote events & aggregates
- rabbitmq — broker (management UI at http://localhost:15672)

🔐 Auth & Roles

- Login → returns JWT
- Protected endpoints require Authorization: Bearer <token>
- Role guard (admin / user) applied at controller level