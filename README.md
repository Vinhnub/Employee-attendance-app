<div align="center">
  <h1 align="center">🏪 Employee Attendance Management System</h1>
  <p align="center">
    <strong>A modern full-stack web application for automated employee attendance tracking and time management.</strong>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI" />
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
    <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
  </p>
</div>

---

## 📖 Table of Contents
- [🎯 Problem Statement](#-problem-statement)
- [✨ Key Features](#-key-features)
- [🛠 Technology Stack](#-technology-stack)
- [🗄 Database Schema](#-database-schema)
- [📁 Project Structure](#-project-structure)
- [🚀 Installation & Setup](#-installation--setup)
- [📡 API Reference](#-api-reference)
- [👥 Roles & Permissions](#-roles--permissions)
- [📊 Google Sheets Integration](#-google-sheets-integration)
- [🐛 Troubleshooting](#-troubleshooting)
- [👨‍💻 Authors](#-authors)

---

## 🎯 Problem Statement

Traditional attendance tracking in small businesses (cafes, retail stores) often relies on manual methods like handwritten logs or basic spreadsheets. This project addresses the need for automated, accurate, and real-time employee attendance management with the following goals:

- **Automation**: Replace manual attendance tracking with a digital check-in/check-out system.
- **Real-time Monitoring**: Live tracking of employee work status.
- **Data Export**: Automated generation of attendance reports and Excel exports.
- **User Management**: Role-based access control for Staff and Managers.
- **Local Network**: Secure operation and smooth performance within local network environments.

---

## ✨ Key Features

### 👥 For Staff Members
- **Digital Check-in/Out**: Start and end work shifts with precise timestamp recording.
- **Shift Management**: Set expected end times and add notes for shift changes.
- **Real-time Status**: View current work status and active shift information.
- **Work History**: Access personal shift history and monthly summaries.
- **Password Management**: Securely change account passwords.
- **Automatic Shift Ending**: The system automatically ends shifts at scheduled times.

### 👨‍💼 For Managers
- **Employee Management**: Register new staff members and manage accounts.
- **Live Monitoring**: View real-time status of all currently working employees.
- **Attendance Reports**: Access daily, monthly, and historical attendance data.
- **User Administration**: Reset passwords and manage user accounts.
- **Data Export**: Generate Excel reports and synchronize directly with Google Sheets.
- **Activity Logs**: Monitor system activities and user actions.
- **Shift Oversight**: View and modify employee shifts when necessary.

---

## 🛠 Technology Stack

### 🎨 Frontend (React Application)
- **React 19**: Modern JavaScript library with hooks and functional components.
- **Vite**: Lightning-fast build tool and development server.
- **React Router v7**: Declarative routing for React applications.
- **Axios**: Promise-based HTTP client for API communication.
- **CSS Modules**: Scoped styling for component isolation.

### ⚙️ Backend (FastAPI Server)
- **FastAPI**: High-performance web framework for building APIs in Python.
- **SQLite**: Embedded database for local data storage.
- **SQLAlchemy**: Powerful Python SQL toolkit and Object-Relational Mapping (ORM).
- **PyJWT**: JSON Web Token implementation for authentication.
- **bcrypt**: Secure password hashing.
- **Google Sheets API**: Real-time spreadsheet integration.
- **Uvicorn**: ASGI server for production deployment.

---

## 🗄 Database Schema

> 💡 **Entity-Relationship Diagram (ERD)** can be found at `server/database/images/ERD.png`.

The application uses **SQLite** with three primary tables:

1. **User**: Stores employee account information and role assignments (staff/manager).
2. **Shift**: Records individual work shifts with timestamps and notes. Linked to the User table.
3. **UserLog**: Audit trail for all user activities, supporting manager oversight and debugging.

---

## 📁 Project Structure

```text
employee-attendance-app/
├── react-app/                          # React Frontend Application
│   ├── src/                            # Main frontend source code
│   │   ├── Component/                  # Reusable UI Components
│   │   ├── Page/                       # Application Pages (Login, Dashboard...)
│   │   ├── Service/                    # API connections (Auth, Employee...)
│   │   └── ...                         # App.jsx, main.jsx, global CSS
│   ├── vite.config.js                  # Vite configuration
│   └── package.json                    # Frontend dependencies
├── server/                             # FastAPI Backend Server
│   ├── controllers/                    # API logic (auth, employee, manager)
│   ├── database/                       # Database management & ERD
│   ├── middleware/                     # Middleware (JWT auth, Logging)
│   ├── models/                         # Data Models (User, Shift, Log)
│   ├── routes/                         # API routing
│   ├── services/                       # Business logic & G-Sheets integration
│   ├── utils/                          # Utility functions (hashing, config)
│   └── main.py                         # FastAPI application entry point
├── requirements.txt                    # Python dependencies
├── .gitignore                          # Git ignore rules
└── README.md                           # Project documentation (this file)
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher) - For Frontend development.
- **Python** (v3.8 or higher) - For Backend development.
- **Git** - Version control.
- **Google Cloud Project** - For Google Sheets API credentials.

### ⚙️ 1. Backend Setup (FastAPI)

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```
2. **Install Python dependencies:**
   ```bash
   pip install -r ../requirements.txt
   ```
3. **Configure environment variables (`.env`):**
   Create a `.env` file inside the `server` directory:
   ```env
   SERVER_IP=127.0.0.1
   PORT_TCP=8000
   SECRET_KEY=your-super-secret-jwt-key-here
   GSHEET_CREDENTIALS=path/to/service-account.json
   SHEET_ID=your-google-sheet-id
   ```
4. **Initialize Database:**
   ```bash
   python -c "from database.access_database import DatabaseFetcher; DatabaseFetcher.initialize_database()"
   ```
5. **Run the Server (Development Mode):**
   ```bash
   python main.py
   ```
   > 🌐 Server runs on: `http://127.0.0.1:8000`

### 🎨 2. Frontend Setup (React)

1. **Navigate to the react-app directory:**
   ```bash
   cd react-app
   ```
2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```
3. **Configure API Endpoints (`.env.development`):**
   Update the URL to point to your backend:
   ```env
   VITE_IP_NETWORK=http://127.0.0.1:8000
   ```
4. **Start the Frontend:**
   ```bash
   npm run dev
   ```
   > 🌐 Application is available at: `http://localhost:5173`

---

## 📡 API Reference

Detailed API documentation (Swagger UI) is available at `http://127.0.0.1:8000/docs` after starting the backend.

- **`/auth/`**: Handles login, logout, password change, and user authentication.
- **`/employee/`**: Staff-specific endpoints (Check-in, Check-out, shift history).
- **`/manager/`**: Manager endpoints (Account registration, view all shifts, manage logs, sync Google Sheets).

---

## 👥 Roles & Permissions

| Permission | Staff | Manager |
|------------|:-----:|:-------:|
| **Check-in / Check-out** | ✅ | ✅ |
| **Change personal password**| ✅ | ✅ |
| **View personal history** | ✅ | ✅ |
| **Register new employees** | ❌ | ✅ |
| **Reset employee passwords**| ❌ | ✅ |
| **View system logs** | ❌ | ✅ |
| **Sync Google Sheets** | ❌ | ✅ |

---

## 📊 Google Sheets Integration

The system integrates with the Google Sheets API to automatically synchronize real-time data:
- **Live Updates**: Automatic synchronization every 30 seconds.
- **Daily Tracking**: Separate sheets to view attendance data for the current day.
- **Monthly Archives**: Automatically generates Excel archive files (`data_per_month/`) at the end of the month.
- **Real-time Status**: Displays live employee status directly on the Sheets.

---

## 🐛 Troubleshooting

**1. Database Connection Errors:**
- Ensure you have run the database initialization script. Delete the `data.db` file (if there's a schema error) and re-run the initialization command.

**2. Google Sheets API Errors:**
- Verify the `service-account.json` path.
- Ensure the Service account (bot email) has **Editor** access to your Google Sheet.
- Enable the "Google Sheets API" in your Google Cloud Console.

**3. Frontend cannot reach Backend:**
- Check if the Backend server is running.
- Verify the `VITE_IP_NETWORK` environment variable in the frontend `.env.development` file.
- Ensure FastAPI CORS is configured correctly (check `main.py`).

---

## 👨‍💻 Authors

- **Nguyen Van Vinh** - Backend Development
- **Pham Hong Quan** - Frontend Development

---

<div align="center">
  <i>Designed for Local Network deployment.<br/>Automatically handles Vietnam timezone (UTC+7).</i>
</div>
