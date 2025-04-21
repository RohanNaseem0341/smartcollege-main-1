import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysys.settings')
django.setup()

# Import models
from studentmanagementsystem.models import Courses, JobRecommendation

def add_sample_job_recommendations():
    print("Adding sample job recommendations...")
    
    # Get all courses or create if they don't exist
    courses = Courses.objects.all()
    
    if not courses.exists():
        print("No courses found. Please add courses first.")
        return
    
    # Sample job recommendations for various courses
    sample_jobs = []
    
    for course in courses:
        course_name = course.course_name.lower()
        
        # Computer Science related courses
        if any(keyword in course_name for keyword in ['computer', 'programming', 'software', 'web']):
            sample_jobs.extend([
                {
                    'course': course,
                    'job_title': 'Software Developer',
                    'description': 'Develop, test, and maintain software applications using various programming languages and technologies.',
                    'entry_salary': '$60,000 - $80,000 per year',
                    'experienced_salary': '$100,000 - $150,000+ per year',
                    'job_website': 'https://www.linkedin.com/jobs/'
                },
                {
                    'course': course,
                    'job_title': 'Web Developer',
                    'description': 'Create and maintain websites and web applications using HTML, CSS, JavaScript, and backend technologies.',
                    'entry_salary': '$55,000 - $75,000 per year',
                    'experienced_salary': '$90,000 - $130,000 per year',
                    'job_website': 'https://www.indeed.com/'
                },
                {
                    'course': course,
                    'job_title': 'DevOps Engineer',
                    'description': 'Implement and manage continuous integration/continuous deployment pipelines and cloud infrastructure.',
                    'entry_salary': '$70,000 - $90,000 per year',
                    'experienced_salary': '$110,000 - $160,000 per year',
                    'job_website': 'https://www.dice.com/'
                }
            ])
        
        # Data Science related courses
        elif any(keyword in course_name for keyword in ['data', 'statistics', 'analytics', 'machine']):
            sample_jobs.extend([
                {
                    'course': course,
                    'job_title': 'Data Analyst',
                    'description': 'Analyze data to identify trends, create visualizations, and generate insights to support business decisions.',
                    'entry_salary': '$55,000 - $75,000 per year',
                    'experienced_salary': '$85,000 - $120,000 per year',
                    'job_website': 'https://www.glassdoor.com/'
                },
                {
                    'course': course,
                    'job_title': 'Data Scientist',
                    'description': 'Apply statistical and machine learning techniques to analyze complex data and develop predictive models.',
                    'entry_salary': '$70,000 - $90,000 per year',
                    'experienced_salary': '$110,000 - $160,000+ per year',
                    'job_website': 'https://www.kaggle.com/jobs'
                },
                {
                    'course': course,
                    'job_title': 'Machine Learning Engineer',
                    'description': 'Design and implement machine learning models and deploy them into production environments.',
                    'entry_salary': '$80,000 - $100,000 per year',
                    'experienced_salary': '$120,000 - $180,000 per year',
                    'job_website': 'https://ai-jobs.net/'
                }
            ])
        
        # Business/Management related courses
        elif any(keyword in course_name for keyword in ['business', 'management', 'finance', 'marketing']):
            sample_jobs.extend([
                {
                    'course': course,
                    'job_title': 'Business Analyst',
                    'description': 'Analyze business processes and systems to identify improvements and translate business needs into technical requirements.',
                    'entry_salary': '$50,000 - $70,000 per year',
                    'experienced_salary': '$80,000 - $115,000 per year',
                    'job_website': 'https://www.monster.com/'
                },
                {
                    'course': course,
                    'job_title': 'Product Manager',
                    'description': 'Define product strategy, roadmap, and features based on market research and customer feedback.',
                    'entry_salary': '$65,000 - $85,000 per year',
                    'experienced_salary': '$100,000 - $150,000 per year',
                    'job_website': 'https://www.productschool.com/jobs/'
                },
                {
                    'course': course,
                    'job_title': 'Marketing Specialist',
                    'description': 'Develop and implement marketing strategies to promote products or services and drive customer engagement.',
                    'entry_salary': '$45,000 - $65,000 per year',
                    'experienced_salary': '$75,000 - $110,000 per year',
                    'job_website': 'https://www.marketinghire.com/'
                }
            ])
        
        # Engineering related courses
        elif any(keyword in course_name for keyword in ['engineering', 'mechanical', 'civil', 'electrical']):
            sample_jobs.extend([
                {
                    'course': course,
                    'job_title': f'{course.course_name} Engineer',
                    'description': f'Apply engineering principles to design, develop, and test {course.course_name.lower()} systems and products.',
                    'entry_salary': '$60,000 - $80,000 per year',
                    'experienced_salary': '$90,000 - $140,000 per year',
                    'job_website': 'https://www.engineerjobs.com/'
                },
                {
                    'course': course,
                    'job_title': 'Project Engineer',
                    'description': 'Oversee technical aspects of engineering projects and coordinate with cross-functional teams.',
                    'entry_salary': '$65,000 - $85,000 per year',
                    'experienced_salary': '$95,000 - $145,000 per year',
                    'job_website': 'https://www.engineering.com/jobs'
                }
            ])
        
        # Default for other courses
        else:
            sample_jobs.append({
                'course': course,
                'job_title': f'{course.course_name} Specialist',
                'description': f'Apply specialized knowledge in {course.course_name.lower()} to solve problems and drive innovation in the field.',
                'entry_salary': '$50,000 - $70,000 per year',
                'experienced_salary': '$80,000 - $120,000 per year',
                'job_website': 'https://www.linkedin.com/jobs/'
            })
    
    # Create job recommendations
    for job_data in sample_jobs:
        # Check if this job recommendation already exists
        existing_job = JobRecommendation.objects.filter(
            course=job_data['course'],
            job_title=job_data['job_title']
        ).first()
        
        if not existing_job:
            JobRecommendation.objects.create(**job_data)
            print(f"Added job: {job_data['job_title']} for {job_data['course'].course_name}")
        else:
            print(f"Job already exists: {job_data['job_title']} for {job_data['course'].course_name}")
    
    print("Sample job recommendations added successfully!")

if __name__ == "__main__":
    add_sample_job_recommendations()