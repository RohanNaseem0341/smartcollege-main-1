@echo off
echo Starting Django server...
start cmd /k "python manage.py runserver"
echo Starting React app...
cd frontend\student-management-app
start cmd /k "npm start"
echo Both servers should now be starting. Check the opened command windows for details. 