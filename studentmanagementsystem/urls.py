from django.urls import path
from .views import StudentList,student_details,student_grades,TeacherList,Teacher_details,student_fees,student_exam,verify_fee_payment
from django.views.generic import RedirectView

urlpatterns = [
    path('', RedirectView.as_view(url='students/', permanent=True), name='index'),
    path('students/', StudentList.as_view(), name='student-list'),
    path('students/<int:std_id>/', student_details, name='student-details'),
    path('students/grades/<int:std_id>/', student_grades, name='student-grades'),
    path('teachers/', TeacherList.as_view(), name='teacher-list'),
    path('teachers/<int:t_id>/', Teacher_details, name='teacher-details'),
    path('students/fees/<int:std_id>/', student_fees, name='student-fees'),
    path('students/fees/payment/<int:std_id>/', verify_fee_payment, name='student-fee-payment'),
    path('students/exam/<int:std_id>/', student_exam, name='student-exam'),
]