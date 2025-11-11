# Employee Attendance Management System

A full-stack web application for managing employee attendance, built with React frontend and FastAPI backend.

## Features

### For Staff Members
- **Check In/Out**: Record daily attendance with timestamps
- **Work Page**: View current work status and session information
- **Overtime Logging**: Track additional work hours
- **Password Management**: Change account password

### For Managers
- **User Management**: Register new employees and manage existing accounts
- **Attendance Monitoring**: View today's shifts and historical logs
- **User Logs**: Access detailed activity logs for each employee
- **Shift Management**: View and manage employee shift records

## Technology Stack

### Frontend
- **React 19** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **SQLite** - Lightweight database for data storage
- **SQLAlchemy** - SQL toolkit and ORM
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Google Sheets API** - Integration for data export

### Security
- JWT-based authentication
- Role-based authorization (staff/manager)
- CORS middleware for cross-origin requests
- Password hashing with bcrypt

## Project Structure

```
employee-attendance-app/
├── react-app/                 # React frontend
│   ├── src/
│   │   ├── Component/         # Reusable UI components
│   │   ├── Page/             # Application pages/routes
│   │   ├── Service/          # API service functions
│   │   └── assets/           # Static assets
│   ├── public/               # Public static files
│   └── package.json          # Frontend dependencies
├── server/                   # FastAPI backend
│   ├── controllers/          # Route handlers
│   ├── database/             # Database setup and schema
│   ├── middleware/           # Custom middleware
│   ├── models/               # Data models
│   ├── routes/               # API route definitions
│   ├── services/             # Business logic services
│   └── utils/                # Utility functions
├── requirements.txt          # Python dependencies
└── README.md                 # Project documentation
```

## Database Schema

The application uses SQLite with three main tables:

- **User**: Stores employee information (username, password, role)
- **Shift**: Records work shifts (start/end times, notes)
- **UserLog**: Activity logs for auditing purposes

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Git

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install Python dependencies:
   ```bash
   pip install -r ../requirements.txt
   ```

3. Set up environment variables:
   Create a `.env` file in the server directory with:
   ```
   SERVER_IP=127.0.0.1
   PORT_TCP=8000
   SECRET_KEY=your-secret-key-here
   ```

4. Initialize the database:
   ```bash
   python -c "from database.access_database import DatabaseFetcher; DatabaseFetcher.initialize_database()"
   ```

### Frontend Setup

1. Navigate to the React app directory:
   ```bash
   cd react-app
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Configure API endpoint:
   Create a `.env.development` file (if not exists) with:
   ```
   VITE_API_BASE_URL=http://localhost:8000
   ```

## Running the Application

### Development Mode

1. Start the backend server:
   ```bash
   cd server
   python main.py
   ```
   The API will be available at `http://localhost:8000`

2. Start the frontend development server:
   ```bash
   cd react-app
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Production Build

1. Build the frontend:
   ```bash
   cd react-app
   npm run build
   ```

2. The built files will be in `react-app/dist/`

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - Register new user (manager only)

### Employee Operations
- `POST /employee/checkin` - Check in for work
- `POST /employee/checkout` - Check out from work
- `POST /employee/overtime` - Log overtime
- `GET /employee/workpage` - Get current work status

### Manager Operations
- `GET /manager/users` - Get all users
- `GET /manager/user/{id}` - Get user details
- `GET /manager/logs/{date}` - Get logs for specific date
- `GET /manager/today` - Get today's shifts
- `GET /manager/user/{id}/logs` - Get user-specific logs
- `GET /manager/user/{id}/shifts` - Get user shifts

## User Roles

### Staff
- Can check in/out and log overtime
- View their own work status
- Change password

### Manager
- All staff permissions
- Register new employees
- View all user data and logs
- Manage attendance records

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact the development team or create an issue in the repository.
