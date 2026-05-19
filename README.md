# CareSync — Hospital Management System

A full-stack hospital management web application where admins can manage patients, doctors, and appointments from a single dashboard.

---

## What does this do?

CareSync is an admin panel for hospital management. Once logged in, the admin can:

- Add, view, update, and delete **patient** records
- Add, view, update, and delete **doctor** records
- **Book appointments** manually between a patient and a doctor
- Manage everything from one clean dashboard

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Java 17, Spring Boot |
| Database | MySQL |
| Auth | Spring Security (JWT / Session) |

---

## Features

- Admin login with authentication (protected routes)
- Patient management — full CRUD
- Doctor management — full CRUD
- Appointment booking — assign a patient to a doctor with a date and time
- REST API backend connected to a React frontend

---

## Project structure

```
caresync/
├── frontend/          → React.js app
│   └── src/
│       ├── pages/     → Login, Dashboard, Patients, Doctors, Appointments
│       └── components/
├── backend/           → Spring Boot app
│   └── src/main/java/
│       ├── controller/
│       ├── service/
│       ├── model/
│       └── repository/
└── README.md
```

---

## How to run locally

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8+
- Maven

### Step 1 — Set up the database

Open MySQL and run:

```sql
CREATE DATABASE caresync_db;
```

### Step 2 — Configure the backend

Open `backend/src/main/resources/application.properties` and update:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/caresync_db
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
server.port=${PORT:8080}
```

### Step 3 — Run the backend

```bash
cd backend
mvn spring-boot:run
```

Backend will start at `http://localhost:8080`

### Step 4 — Run the frontend

```bash
cd frontend
npm install
npm start
```

Frontend will start at `http://localhost:3000`

### Step 5 — Login

Open `http://localhost:3000` in your browser and log in with the admin credentials.

---

## API endpoints

### Auth
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/logout` | Logout |

### Patients
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/patients` | Get all patients |
| GET | `/api/patients/{id}` | Get one patient |
| POST | `/api/patients` | Add a patient |
| PUT | `/api/patients/{id}` | Update a patient |
| DELETE | `/api/patients/{id}` | Delete a patient |

### Doctors
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/doctors` | Get all doctors |
| GET | `/api/doctors/{id}` | Get one doctor |
| POST | `/api/doctors` | Add a doctor |
| PUT | `/api/doctors/{id}` | Update a doctor |
| DELETE | `/api/doctors/{id}` | Delete a doctor |

### Appointments
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/appointments` | Get all appointments |
| POST | `/api/appointments` | Book an appointment |
| DELETE | `/api/appointments/{id}` | Cancel an appointment |

---


## Future improvements

- Patient self-registration and login
- Doctor availability calendar
- Email/SMS notifications for appointments
- Billing and invoice generation

---

## Author

Neha Gupta
Java + React Developer  
[GitHub](https://github.com/nehaaguptaaa) 
