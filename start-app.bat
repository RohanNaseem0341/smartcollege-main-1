@echo off
echo Starting Django server...
start cmd /k "python manage.py runserver"
echo Starting React app...
cd frontend\student-management-app
start cmd /k "npm start"
echo Both servers should now be starting in separate windows.
echo Access the application at http://localhost:3000 