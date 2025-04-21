from django.db import models


    
class Student(models.Model):
    std_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True, db_index=True)
    password = models.CharField(max_length=128)
    department = models.CharField(max_length=255, db_index=True)
    courses = models.ManyToManyField('Courses', through='StudentData')


    def __str__(self):
        return self.username
class Courses(models.Model):
    course_id=models.AutoField(primary_key=True)
    course_name=models.CharField(max_length=100)

    def __str__(self):
        return self.course_name 

class StudentData(models.Model):
    id = models.AutoField(primary_key=True)

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Courses, on_delete=models.CASCADE)
    attendance = models.IntegerField()
    marks = models.IntegerField()

    def __str__(self):
        return f"{self.student.username} - {self.course.course_name}"
    
class Grades(models.Model):
    id = models.AutoField(primary_key=True)

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    cgpa = models.FloatField()
    gpa1 = models.FloatField()

    gpa2 = models.FloatField()

    gpa3 = models.FloatField()

    gpa4 = models.FloatField()


    def __str__(self):
        return f"{self.student.username} - Grades "

class Teacher(models.Model):
    teacher_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True, db_index=True)
    password = models.CharField(max_length=128)
    course = models.ForeignKey(Courses, on_delete=models.CASCADE, db_index=True)
    
    def __str__(self):
        return self.username
    
class Fees(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    ammount = models.IntegerField()
    status = models.CharField(max_length=10)
    def __str__(self):
        return self.student.username
    
class Examination(models.Model):
    course = models.ForeignKey(Courses, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    venue = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.course.course_name} - {self.date} {self.time}"

class JobRecommendation(models.Model):
    id = models.AutoField(primary_key=True)
    course = models.ForeignKey(Courses, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=200)
    description = models.TextField()
    entry_salary = models.CharField(max_length=100)
    experienced_salary = models.CharField(max_length=100)
    job_website = models.URLField(max_length=200)
    
    def __str__(self):
        return f"{self.course.course_name} - {self.job_title}"