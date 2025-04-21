from studentmanagementsystem.models import Student, Teacher, Courses, Examination

def admin_stats(request):
    """
    Context processor to provide statistics for admin dashboard
    """
    # Only run this for admin pages
    if not request.path.startswith('/admin/'):
        return {}
        
    try:
        student_count = Student.objects.count()
        teacher_count = Teacher.objects.count()
        course_count = Courses.objects.count()
        exam_count = Examination.objects.count()
    except:
        # Handle cases where tables don't exist yet (e.g., before migrations)
        student_count = 0
        teacher_count = 0
        course_count = 0
        exam_count = 0
    
    return {
        'studentcount': student_count,
        'teachercount': teacher_count,
        'coursecount': course_count,
        'examcount': exam_count,
    } 