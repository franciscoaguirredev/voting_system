# 🗳️ Sistema de Votación Electrónica -- API REST

API desarrollada con **NestJS**, **TypeScript**, **TypeORM** y
**PostgreSQL**, diseñada para gestionar votantes, candidatos y votos,
incluyendo estadísticas y participación.

Incluye autenticación mediante **JWT**, validación con
**class-validator**, documentación con **Swagger** y estructura modular
limpia.

## 📌 Características principales

-   Registro y gestión de **votantes**
-   Registro y gestión de **candidatos**
-   Emisión de **votos**
-   Estadísticas por candidato
-   Participación total
-   Autenticación JWT
-   Documentación con Swagger

## 🛠️ Tecnologías utilizadas

-   NestJS\
-   TypeScript\
-   TypeORM\
-   PostgreSQL\
-   JWT\
-   Swagger

## 📦 Instalación

### 1. Clonar el repositorio

    git clone https://github.com/franciscoaguirredev/voting_system.git
    cd voting_system

### 2. Instalar dependencias

    npm install

### 3. Configurar variables de entorno

Crear `.env`:

    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USER=postgres
    DATABASE_PASS=tu_password
    DATABASE_NAME=voting_system

    JWT_SECRET=supersecret_jwt
    JWT_EXPIRES=2h

### 4. Crear la base de datos

    CREATE DATABASE voting_system;

### 5. Ejecutar la app

    npm run start:dev

Swagger: http://localhost:3000/api/docs

------------------------------------------------------------------------

# 📚 Endpoints principales

## 🔐 Auth

  Método   Endpoint           Descripción
  -------- ------------------ -------------------
  POST     `/auth/login`      Login

## 🧍‍♂️ Voters

    Método   Endpoint                 Descripción
    POST     `/voters`                Crear votante
    GET      `/voters`                Obtener votantes
    GET      `/voters/:id`            Obtener por ID
    DELETE   `/voters/:id`            Eliminar por ID
 
### DTO

    {
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "password": "Password123!"
    }

## 🧑‍💼 Candidates


    Método   Endpoint            Descripción
    POST     `/candidates`       Crear candidato
    GET      `/candidates`       Obtener todos
    GET      `/candidates/:id`   Obtener por ID    
    DELETE   `/candidates/:id`   Eliminar

### DTO

    {
      "name": "María Gómez",
      "party": "Partido Verde"
    }

## 🗳️ Votes

  Método   Endpoint                 Descripción
  -------- ------------------------ ----------------
  POST     `/votes`                 Registrar voto
  GET      `/votes`                 Obtener votos
  GET      `/votes/statistics`      Estadísticas
  GET      `/votes/participation`   Participación

### DTO

    {
      "voter_id": "uuid-votante",
      "candidate_id": "uuid-candidato"
    }

------------------------------------------------------------------------

# 📊 Ejemplo de estadísticas

    {
      "data": {
        "totalVotes": 10,
        "candidates": [
          {
            "candidateId": "abc123",
            "candidateName": "María Gómez",
            "party": "Partido Verde",
            "votes": 4,
            "percentage": 40
          }
        ]
      }
    }

# 📈 Ejemplo de participación

    {
      "totalVoters": 25,
      "votersWhoVoted": 10,
      "participationPercentage": 40
    }

# 🧪 Cómo probar

1.  POST /voters
2.  POST /auth/login
3.  POST /candidates
4.  POST /votes
5.  GET /votes/statistics
6.  GET /votes/participation

# 🧩 Estructura

    src/
    ├── auth/
    ├── modules/
    ├   ├── candidates
    ├   ├── common
    ├   ├── voters
    ├   ├── votes
    └── main.ts

# 🛡️ Seguridad

-   JWT excepto POST:/voters y POST:/auth/login
-   Passwords hashed\
-   Validación DTO

# 📄 Licencia

MIT
