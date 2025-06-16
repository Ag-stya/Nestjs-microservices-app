# NestJS Microservices App 🧱

This is a production-grade **NestJS Microservices Monorepo** built using:

- 🧠 **NestJS** – Progressive Node.js framework
- 🕊️ **RabbitMQ** – For message-based communication
- 🍃 **MongoDB Replica Set** – Resilient and scalable NoSQL data layer
- 🛡️ **Docker Compose** – For containerized local development
- 🔐 **Auth, Orders, Billing** services – Cleanly separated domains
- 🧩 **@app/common** – Shared reusable modules, DTOs, interfaces

---

## 🚀 Architecture

.
├── apps
│   ├── auth
│   ├── billing
│   └── orders
├── dist
│   └── apps
├── docker-compose.yaml
├── libs
│   └── common
├── mongo-init.js
├── nest-cli.json
├── package-lock.json
├── package.json
├── tsconfig.build.json
└── tsconfig.json


---

## 🧪 Features

- ✅ **Microservices** via NestJS built-in messaging
- ✅ **RabbitMQ** message broker with queues
- ✅ **MongoDB Replica Set** for fault-tolerant storage
- ✅ **Separate `.env`** per service for clean config
- ✅ **Common Shared Library** for DRY principles
- ✅ **Dockerized** for consistent local/dev setup

---

## ⚙️ Prerequisites

- Docker + Docker Compose
- Node.js 18+
- Basic knowledge of NestJS & message brokers

---

## 🧱 Setup Instructions

1. **Clone the repo**  
```bash
git clone https://github.com/Ag-stya/Nestjs-microservices-app.git
cd Nestjs-microservices-app

🔐 Services Overview
Service	Port	Description
Auth	3000	Login, Register, JWT
Orders	3001	Create & Manage Orders
Billing	3002	Process Payments
