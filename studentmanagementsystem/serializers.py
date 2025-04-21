from rest_framework import serializers
from .models import Student,StudentData,Teacher,Fees,Courses,JobRecommendation
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ['course_id', 'course_name']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['std_id','username', 'password', 'department']

class StudentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentData
        fields = ['course','attendance','marks']
class GradesSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentData
        fields = ['cgpa','gpa1','gpa2','gpa3','gpa4']
class TeacherSerializer(serializers.ModelSerializer):
    course_name = serializers.ReadOnlyField(source='course.course_name')
    course_id = serializers.ReadOnlyField(source='course.course_id')
    course = CourseSerializer(read_only=True)

    class Meta:
        model = Teacher
        fields = ['teacher_id', 'name', 'username', 'password', 'course_id', 'course_name', 'course']

class FeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fees
        fields = '__all__'

class JobRecommendationSerializer(serializers.ModelSerializer):
    course_name = serializers.ReadOnlyField(source='course.course_name')
    
    class Meta:
        model = JobRecommendation
        fields = ['id', 'course', 'course_name', 'job_title', 'description', 'entry_salary', 'experienced_salary', 'job_website']

