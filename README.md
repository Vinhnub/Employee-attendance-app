# Employee Attendance Management System

A comprehensive full-stack web application for automated employee attendance tracking and time management, designed specifically for small cafes and retail businesses. The system replaces manual attendance methods with digital check-in/out functionality, real-time monitoring, and automated reporting.

## 🎯 Problem Statement

Traditional attendance tracking in small businesses (cafes, retail stores) often relies on manual methods like handwritten logs or basic spreadsheets. This project addresses the need for automated, accurate, and real-time employee attendance management with the following goals:

- **Automation**: Replace manual attendance tracking with digital check-in/check-out
- **Real-time Monitoring**: Live tracking of employee work status
- **Data Export**: Automated generation of attendance reports and Excel exports
- **User Management**: Role-based access control for staff and managers
- **Local Network**: Secure operation within local network environments

## ✨ Key Features

### 👥 For Staff Members
- **Digital Check-in/Out**: Start and end work shifts with timestamp recording
- **Shift Management**: Set expected end times and add notes for shift changes
- **Real-time Status**: View current work status and active shift information
- **Work History**: Access personal shift history and monthly summaries
- **Password Management**: Secure account password changes
- **Automatic Shift Ending**: System automatically ends shifts at scheduled times

### 👨‍💼 For Managers
- **Employee Management**: Register new staff members and manage accounts
- **Live Monitoring**: View real-time status of all employees currently working
- **Attendance Reports**: Access daily, monthly, and historical attendance data
- **User Administration**: Reset passwords and manage user accounts
- **Data Export**: Generate Excel reports and Google Sheets integration
- **Activity Logs**: Monitor system activities and user actions
- **Shift Oversight**: View and modify employee shifts when necessary

### 🤖 System Automation
- **Real-time Updates**: Automatic Google Sheets synchronization every 30 seconds
- **Monthly Reports**: Automated Excel export at month-end
- **Shift Validation**: Prevent invalid shift operations (double check-in, etc.)
- **Token Management**: Automatic cleanup of expired authentication tokens
- **Background Processing**: Asynchronous data updates and sheet refreshes

## 🛠 Technology Stack

### Frontend (React Application)
- **React 19** - Modern JavaScript library with hooks and functional components
- **Vite** - Lightning-fast build tool and development server
- **React Router v7** - Declarative routing for React applications
- **Axios** - Promise-based HTTP client for API communication
- **CSS Modules** - Scoped styling for component isolation

### Backend (FastAPI Server)
- **FastAPI** - High-performance web framework for building APIs
- **SQLite** - Embedded database for local data storage
- **SQLAlchemy** - Python SQL toolkit and Object-Relational Mapping
- **PyJWT** - JSON Web Token implementation for authentication
- **bcrypt** - Secure password hashing
- **Google Sheets API** - Real-time spreadsheet integration
- **Uvicorn** - ASGI server for production deployment

### Security & Authentication
- **JWT Tokens**: Stateless authentication with configurable expiration
- **Role-Based Access Control**: Staff and Manager permission levels
- **Password Security**: bcrypt hashing with salt
- **CORS Middleware**: Cross-origin resource sharing configuration
- **Request Logging**: Comprehensive audit trail middleware

### External Integrations
- **Google Sheets**: Real-time attendance data synchronization
- **Google Drive API**: Automated file storage and sharing
- **Excel Export**: Monthly attendance reports in .xlsx format

## 📁 Project Structure

```
├── 📁 react-app
│   ├── 📁 public
│   │   └── 🖼️ vite.svg
│   ├── 📁 src
│   │   ├── 📁 Component
│   │   │   ├── 📄 Calendar.jsx
│   │   │   ├── 🎨 Calendar.module.css
│   │   │   ├── 🎨 Component.module.css
│   │   │   ├── 📄 Header.jsx
│   │   │   ├── 🎨 Header.module.css
│   │   │   ├── 📄 Layout.jsx
│   │   │   ├── 🎨 Layout.module.css
│   │   │   ├── 📄 ManagerNav.jsx
│   │   │   ├── 📄 Navbar.jsx
│   │   │   ├── 🎨 Navbar.module.css
│   │   │   ├── 📄 PopUp.jsx
│   │   │   ├── 📄 ShiftsTable.jsx
│   │   │   ├── 🎨 ShiftsTable.module.css
│   │   │   ├── 📄 ThemeContext.jsx
│   │   │   └── 📄 UserNav.jsx
│   │   ├── 📁 Page
│   │   │   ├── 📄 ChangePassword.jsx
│   │   │   ├── 🎨 ChangePassword.module.css
│   │   │   ├── 📄 CheckIn.jsx
│   │   │   ├── 🎨 CheckIn.module.css
│   │   │   ├── 📄 CheckOut.jsx
│   │   │   ├── 🎨 CheckOut.module.css
│   │   │   ├── 📄 Login.jsx
│   │   │   ├── 🎨 Login.module.css
│   │   │   ├── 📄 LogsPage.jsx
│   │   │   ├── 🎨 LogsPage.module.css
│   │   │   ├── 📄 OverTime.jsx
│   │   │   ├── 🎨 OverTime.module.css
│   │   │   ├── 📄 Register.jsx
│   │   │   ├── 🎨 Register.module.css
│   │   │   ├── 📄 TodayShifts.jsx
│   │   │   ├── 🎨 TodayShifts.module.css
│   │   │   ├── 📄 Unauthorized.jsx
│   │   │   ├── 🎨 Unauthorized.module.css
│   │   │   ├── 📄 User.jsx
│   │   │   ├── 🎨 User.module.css
│   │   │   ├── 📄 UserList.jsx
│   │   │   ├── 🎨 UserList.module.css
│   │   │   ├── 📄 UserLogs.jsx
│   │   │   ├── 🎨 UserLogs.module.css
│   │   │   ├── 🎨 UserShifts.module.css
│   │   │   ├── 📄 WorkPage.jsx
│   │   │   ├── 🎨 WorkPage.module.css
│   │   │   └── 📄 userShifts.jsx
│   │   ├── 📁 Service
│   │   │   ├── 📄 Auth.js
│   │   │   ├── 📄 Authorization.jsx
│   │   │   ├── 📄 Employee.js
│   │   │   └── 📄 Management.js
│   │   ├── 📁 assets
│   │   │   └── 🖼️ react.svg
│   │   ├── 📁 utils
│   │   │   └── 📄 viewportHeight.js
│   │   ├── 🎨 App.css
│   │   ├── 📄 App.jsx
│   │   ├── 🎨 index.css
│   │   └── 📄 main.jsx
│   ├── ⚙️ .dockerignore
│   ├── ⚙️ .gitignore
│   ├── 🐳 Dockerfile
│   ├── 📝 README.md
│   ├── ⚙️ db.json
│   ├── 📄 eslint.config.js
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   └── 📄 vite.config.js
├── 📁 server
│   ├── 📁 controllers
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 auth_controller.py
│   │   ├── 🐍 employee_controller.py
│   │   └── 🐍 manager_controller.py
│   ├── 📁 database
│   │   ├── 📁 data_per_month
│   │   │   ├── 📄 10-2025.xlsx
│   │   │   ├── 📄 11-2025.xlsx
│   │   │   └── 📄 12-2025.xlsx
│   │   ├── 📁 images
│   │   │   ├── 🖼️ ERD.png
│   │   │   └── 🖼️ diagram.png
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 access_database.py
│   │   ├── 📄 current_month.txt
│   │   ├── 📄 data.db
│   │   ├── 🐍 database_tester.py
│   │   └── 📄 schema.sql
│   ├── 📁 middleware
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 auth_middleware.py
│   │   └── 🐍 logging_middleware.py
│   ├── 📁 models
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 log.py
│   │   ├── 🐍 shift.py
│   │   └── 🐍 user.py
│   ├── 📁 routes
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 auth_router.py
│   │   ├── 🐍 employee_router.py
│   │   └── 🐍 manager_router.py
│   ├── 📁 services
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 base_service.py
│   │   ├── 🐍 gsheet_service.py
│   │   ├── 🐍 log_service.py
│   │   ├── 🐍 shift_service.py
│   │   └── 🐍 user_service.py
│   ├── 📁 utils
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 config.py
│   │   ├── 🐍 hashing.py
│   │   └── 🐍 jwt_handler.py
│   ├── ⚙️ .dockerignore
│   ├── 🐳 Dockerfile
│   ├── 🐍 __init__.py
│   ├── 🐍 dependencies.py
│   ├── ⚙️ logging.yaml
│   ├── 🐍 main.py
│   ├── 📄 requirements.txt
│   └── 🐍 server_instance.py
├── ⚙️ .gitignore
├── 📝 README.md
├── ⚙️ docker-compose.yml
├── 📄 docker_&_nssm_command.txt
├── 📄 gg_sheet_api_getting.txt
└── 📄 setup_host.txt
```

## 🗄 Database Schema

The application uses SQLite with three primary tables:

### User Table
```sql
CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    fullname TEXT,
    role TEXT
);
```
- Stores employee account information and role assignments

### Shift Table
```sql
CREATE TABLE Shift (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time TEXT,
    end_time TEXT,
    note TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);
```
- Records individual work shifts with timestamps
- Supports shift notes for special circumstances
- Cascading deletion maintains data integrity

### UserLog Table
```sql
CREATE TABLE UserLog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    date_time TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);
```
- Audit trail for all user activities
- Timestamps for activity monitoring
- Supports manager oversight and debugging

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher) - Frontend development
- **Python** (v3.8 or higher) - Backend development
- **Git** - Version control
- **Google Cloud Project** - For Google Sheets API (optional)

### Backend Configuration

1. **Navigate to server directory:**
   ```bash
   cd app folder (main folder)
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r ../requirements.txt
   ```

3. **Configure environment variables:**
   Create `.env` file in server directory:
   ```env
   SERVER_IP=127.0.0.1
   PORT_TCP=8000
   SECRET_KEY=your-super-secret-jwt-key-here
   GSHEET_CREDENTIALS="server/database/credentials.json"
   SHEET_ID=your-google-sheet-id
   ```
4. **How to get credentials.json:**
   ```
   Tutorial in gg_sheet_api_getting.txt
   ```

### Frontend Configuration

1. **Navigate to React application:**
   ```bash
   cd react-app
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Configure API endpoints:**
   Update `.env.development` for development:
   ```env
   VITE_IP_NETWORK=http://127.0.0.1:8000
   ```
   Update `.env.production` for production:
   ```env
   VITE_IP_NETWORK=https://your-production-server.com
   ```

## 🏃‍♂️ Running the Application

### Development Environment

1. **Start Backend Server:**
   ```bash
   python -m server.main
   ```
   Server runs on `http://127.0.0.1:8000`

2. **Start Frontend Development Server:**
   ```bash
   cd react-app
   npm run dev
   ```
   Application available at `http://localhost:5173`

### Production Deployment

1. **Build Frontend Application:**
   ```bash
   cd react-app
   npm run build
   ```
   Production files generated in `react-app/dist/`

2. **Deploy Backend:**
   Configure production server with proper environment variables and start with:
   ```bash
   python main.py
   ```
2. **Deploy Production:**
   Use nssm to install service for app (automatic run)
   ```bash
   Detail in file setup_host.txt
   ```


## 📡 API Reference

### Authentication Endpoints
- `POST /auth/login` - User authentication
- `GET /auth/me` - Get current user information
- `PUT /auth/logout` - User logout
- `PUT /auth/change_password` - Password update

### Employee Endpoints
- `POST /employee/start_shift` - Begin work shift
- `PUT /employee/end_shift` - End work shift
- `PUT /employee/edit_shift` - Modify active shift
- `GET /employee/shifts` - Get monthly shift history

### Manager Endpoints
- `POST /manager/register` - Create new user account
- `GET /manager/users` - List all users
- `GET /manager/user/{id}` - Get specific user details
- `PUT /manager/user/{id}/reset_password` - Reset user password
- `DELETE /manager/user/{id}` - Remove user account
- `GET /manager/today` - Get today's shifts
- `GET /manager/logs/{date}` - Get logs by date
- `GET /manager/user/{id}/logs` - Get user-specific logs
- `GET /manager/user/{id}/shifts` - Get user shifts
- `PUT /manager/refresh_sheet` - Sync Google Sheets data

## 👥 User Roles & Permissions

### Staff Role (nhân viên)
- ✅ Check in/out with shift scheduling
- ✅ View personal work history
- ✅ Edit active shifts (end time only)
- ✅ Add shift notes
- ✅ Change account password
- ✅ View current shift status

### Manager Role (quản lý)
- ✅ All Staff permissions
- ✅ Register new employees
- ✅ View all employee data
- ✅ Reset employee passwords
- ✅ Delete user accounts
- ✅ Access system logs
- ✅ Export attendance reports
- ✅ Real-time attendance monitoring
- ✅ Google Sheets data synchronization

## 🔒 Security Features

- **JWT Authentication**: Stateless token-based authentication
- **Password Hashing**: bcrypt with salt for secure password storage
- **Role-Based Access**: Granular permission system
- **Request Validation**: Pydantic models for data validation
- **CORS Protection**: Configured cross-origin policies
- **Audit Logging**: Comprehensive activity tracking
- **Token Expiration**: Automatic cleanup of expired sessions

## 📊 Google Sheets Integration

The system integrates with Google Sheets for real-time data synchronization:

### Features
- **Live Updates**: Automatic synchronization every 30 seconds
- **Daily Tracking**: Separate sheets for daily and monthly views
- **Monthly Archives**: Automatic Excel export at month-end
- **Real-time Status**: Live employee status indicators
- **Data Visualization**: Formatted spreadsheets with timestamps

### Sheet Structure
1. **Daily Sheet**: Current day attendance with live status
2. **Monthly Sheet**: Complete month overview with totals
3. **Archive Files**: Monthly Excel exports in `data_per_month/`

## 🔄 System Automation

### Background Processes
- **Real-time Sync**: 30-second interval Google Sheets updates
- **Automatic Shift Ending**: Scheduled shift completion
- **Monthly Data Export**: End-of-month Excel generation
- **Token Cleanup**: Expired authentication token removal
- **Cache Management**: Memory optimization and data refresh

### Scheduled Tasks
- **New Month Detection**: Automatic monthly data initialization
- **Data Archiving**: Monthly attendance data preservation
- **Sheet Reset**: Clean monthly sheet preparation

## 🐛 Troubleshooting

### Common Issues



**Google Sheets API Issues:**
- Verify service account credentials
- Check Google Cloud project permissions
- Ensure Sheets API is enabled

**Frontend Build Errors:**
```bash
cd react-app
rm -rf node_modules package-lock.json
npm install
```

**Port Conflicts:**
- Modify `PORT_TCP` in server `.env`
- Update `VITE_IP_NETWORK` in React config

## 🤝 Contributing

1. **Fork the Repository**
2. **Create Feature Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make Changes and Test**
4. **Commit Changes:**
   ```bash
   git commit -m "Add: brief description of changes"
   ```
5. **Push and Create Pull Request**

### Development Guidelines
- Follow existing code style and structure
- Add appropriate error handling
- Update documentation for new features
- Test thoroughly before submitting

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 📞 Support & Contact

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check the project documentation in `report.docx`
- Or contact Vinhnub (gmail: vinhvane685@gmail.com)

## 🎯 Future Enhancements

- Mobile application development
- Advanced reporting and analytics
- Multi-location support
- Integration with payroll systems
- Facial recognition check-in
- SMS/Email notifications
- Advanced shift scheduling
- Time-off request management

---

**Note**: This system is designed for local network deployment and includes Vietnamese language support in the backend responses. The application automatically handles timezone conversion for Vietnam (UTC+7).
