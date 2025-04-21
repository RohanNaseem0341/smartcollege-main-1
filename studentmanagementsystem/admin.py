from .models import Student,Courses,StudentData,Grades,Teacher,Fees,Examination,JobRecommendation
from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe

admin.site.site_header = "Smart College Admin"
admin.site.site_title = "Smart College Portal"
admin.site.index_title = "Welcome to Smart College Management System"

# Registration Action
def mark_as_paid(modeladmin, request, queryset):
    queryset.update(status='paid')
mark_as_paid.short_description = "Mark selected fees as paid"

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('std_id', 'username', 'department')
    list_filter = ('department',)
    search_fields = ('username', 'std_id', 'department')
    readonly_fields = ('std_id',)
    fieldsets = (
        ('Personal Information', {
            'fields': ('username', 'password', 'department'),
            'description': 'Enter the student\'s personal information here.',
        }),
    )
    
    def view_courses(self, obj):
        url = reverse('admin:studentmanagementsystem_studentdata_changelist') + '?student__id__exact=' + str(obj.std_id)
        return format_html('<a class="button" href="{}">View Courses</a>', url)
    view_courses.short_description = 'Courses'

@admin.register(Courses)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('course_id', 'course_name')
    search_fields = ('course_name',)
    readonly_fields = ('course_id',)
    
    def student_count(self, obj):
        count = StudentData.objects.filter(course=obj).count()
        return count
    student_count.short_description = 'Enrolled Students'

@admin.register(StudentData)
class StudentDataAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'course', 'attendance', 'marks')
    list_filter = ('course', 'student')
    search_fields = ('student__username', 'course__course_name')
    
    def attendance_percentage(self, obj):
        percentage = (obj.attendance / 40) * 100
        return f"{percentage:.1f}%"
    attendance_percentage.short_description = 'Attendance %'

@admin.register(Grades)
class GradesDataAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'cgpa', 'gpa1', 'gpa2', 'gpa3', 'gpa4')
    list_filter = ('student',)
    search_fields = ('student__username',)
    fieldsets = (
        ('Student', {
            'fields': ('student',),
            'description': 'Student Information',
        }),
        ('Grade Point Averages', {
            'fields': ('cgpa', 'gpa1', 'gpa2', 'gpa3', 'gpa4'),
            'classes': ('wide',),
            'description': 'All GPAs are on a scale of 0.0 to 4.0',
        }),
    )

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('teacher_id', 'name', 'username', 'course')
    list_filter = ('course',)
    search_fields = ('name', 'username', 'course__course_name')
    readonly_fields = ('teacher_id',)
    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'username', 'password'),
            'description': 'Teacher\'s personal information',
        }),
        ('Course Information', {
            'fields': ('course', 'teacher_id'),
        }),
    )

@admin.register(Fees)
class FeesAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'ammount', 'status')
    list_filter = ('status',)
    search_fields = ('student__username',)
    list_editable = ('status',)
    actions = [mark_as_paid]

@admin.register(Examination)
class ExaminationAdmin(admin.ModelAdmin):
    list_display = ('id', 'course', 'date', 'time', 'venue')
    list_filter = ('course', 'date')
    search_fields = ('course__course_name', 'venue')
    date_hierarchy = 'date'
    fieldsets = (
        ('Exam Details', {
            'fields': ('course', 'date', 'time'),
            'description': 'Examination details including date and time',
        }),
        ('Location', {
            'fields': ('venue',),
            'description': 'Where the exam will take place',
        }),
    )

@admin.register(JobRecommendation)
class JobRecommendationAdmin(admin.ModelAdmin):
    list_display = ('id', 'job_title', 'course', 'entry_salary', 'experienced_salary')
    list_filter = ('course',)
    search_fields = ('job_title', 'course__course_name', 'description')
    list_per_page = 20
    
    fieldsets = (
        (None, {
            'fields': ('job_title', 'course', 'description', 'entry_salary', 'experienced_salary', 'job_website'),
        }),
    )