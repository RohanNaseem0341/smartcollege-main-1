# Student Management System

A comprehensive student management system with a Django backend and React frontend.

## Features

- Student dashboard with performance metrics
- Course management and attendance tracking
- Grade viewing and management
- Fee payment integration with Easypaisa (Account No. 03417220826)
- Teacher portal with student assignment
- Exam scheduling

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm 6+

### Installation

1. Clone the repository
2. Set up the Django backend:
   ```
   pip install -r requirements.txt
   python manage.py migrate
   ```
3. Set up the React frontend:
   ```
   cd frontend/student-management-app
   npm install
   ```

### Running the Application

#### Option 1: Using the Batch File (Recommended for Windows)

Simply run the `start-app.bat` file by double-clicking it or running it from the command line:

```
start-app.bat
```

This will start both the Django server and React app in separate windows.

#### Option 2: Manual Start

**Start the Django server:**
```
python manage.py runserver
```

**Start the React app:**
```
cd frontend/student-management-app
npm start
```

### Accessing the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Payment Information

To pay fees, use the Easypaisa account:
- Account Number: 03417220826

## Troubleshooting

If you encounter any issues:

1. Make sure both servers are running
2. Check the console for any error messages
3. Verify that your database is properly migrated

For PowerShell users: If you encounter issues with command separators (`&&`), use the batch file or run commands in separate terminals. 