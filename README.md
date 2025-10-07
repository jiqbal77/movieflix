# 🎬 Movie Search & Favorites – Full Stack Monorepo

A **full-stack movie search and favorites application**, built with **Next.js (frontend)** and **NestJS (backend)**.

The app allows users to **search movies via the OMDb API**, **manage favorites**, and explore a modern full-stack architecture using **TypeScript, TanStack Query, Tailwind, and NestJS**.

---

## 🏗️ Repository Structure

```
movie-search-favorites/
├── FE/           # Next.js frontend (React, TypeScript, TanStack Query)
├── BE/           # NestJS backend (OMDb integration, in-memory favorites)
└── README.md     # Root guide (this file)
```

Each subproject has its **own README** with detailed documentation:

- 📘 [Frontend README](./FE/README.md)
- 📗 [Backend README](./BE/README.md)

---

## 🚀 Features Overview

### 🖥️ Frontend (Next.js)
- Movie search with pagination  
- Add/remove favorites (stored in backend)
- Responsive UI built with Tailwind CSS  
- TanStack Query for data fetching and caching  
- Dockerized setup for easy deployment  

### ⚙️ Backend (NestJS)
- RESTful API for movies and favorites  
- OMDb API integration  
- In-memory favorites storage  
- Input validation, error handling, and logging  
- Swagger API documentation  
- Docker + environment-based configuration  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js 15, React 19, TypeScript, TanStack Query, Tailwind CSS, Axios |
| **Backend** | NestJS 10, TypeScript, Axios, class-validator, dotenv |
| **Infrastructure** | Docker, Docker Compose |
| **API Source** | [OMDb API](https://www.omdbapi.com/) |

---

## ⚙️ Prerequisites

Before running the project locally or via Docker, ensure you have:

- [Node.js 20+](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)
- [Docker & Docker Compose](https://www.docker.com/)
- [OMDb API Key](https://www.omdbapi.com/apikey.aspx)

---

## 🧩 Local Setup (Manual)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/movie-search-favorites.git
cd movie-search-favorites
```

### 2️⃣ Backend Setup
```bash
cd BE
cp .env.example .env.development
pnpm install
pnpm run start:dev
```
Backend runs at: **http://localhost:3000**

### 3️⃣ Frontend Setup
Open a new terminal:
```bash
cd FE
cp .env.example .env.local
yarn install
yarn dev
```
Frontend runs at: **http://localhost:3001**

### 4️⃣ Access the App
Open [http://localhost:3001](http://localhost:3001) in your browser.  
You can now search movies and manage favorites!

---

## 🐳 Running with Docker (Recommended)

### 1️⃣ Build and Start Both Services
From the project root:
```bash
docker-compose up --build
```

This will:
- Start the **NestJS backend** on port `3000`
- Start the **Next.js frontend** on port `3001`

### 2️⃣ Access the App
- Frontend: [http://localhost:3001](http://localhost:3001)
- Backend API: [http://localhost:3000/v1/api/movies](http://localhost:3000/v1/api/movies)
- Swagger Docs: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

### 3️⃣ Stop Containers
```bash
docker-compose down
```

---

## 🧪 Testing

Each service includes its own tests.  
Refer to their READMEs for details:

- ✅ **Frontend**: 63 passing tests, ~80% coverage  
- ✅ **Backend**: 97–100% coverage on core services  

Run tests individually:
```bash
# Frontend
cd FE
yarn test

# Backend
cd BE
pnpm run test
```

---

## 🧭 Environment Variables Overview

| Service | File | Key | Description |
|----------|------|-----|-------------|
| Frontend | `.env.local` | `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL |
| Backend | `.env.development` | `OMDB_API_KEY` | Your OMDb API key |
| Backend | `.env.development` | `ALLOWED_ORIGINS` | Allowed frontend origin(s) |

> Each subproject README contains full details and examples.

---

## 📚 Documentation

- 📘 [Frontend Documentation](./FE/README.md)
- 📗 [Backend Documentation](./BE/README.md)
- 🧾 [OMDb API Reference](https://www.omdbapi.com/)

---

## 🧱 Architecture Overview

```
Frontend (Next.js)
   ↓ REST API calls
Backend (NestJS)
   ↓
OMDb API (External)
```

- The frontend queries the backend instead of OMDb directly.  
- The backend handles all communication, validation, and caching logic.

---

## 🚧 Future Enhancements

- [ ] Persist favorites in a database (e.g., PostgreSQL or MongoDB)
- [ ] Add authentication (JWT/OAuth)
- [ ] Add E2E tests (Playwright)
- [ ] Setup CI/CD pipeline for automated deployments

---

## 🪪 License

This project is licensed under the [MIT License](./LICENSE).

---

## 🤝 Contributing

Contributions are welcome!  
To contribute:
1. Fork the repo  
2. Create a feature branch  
3. Submit a pull request  
