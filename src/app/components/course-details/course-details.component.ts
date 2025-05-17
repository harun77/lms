import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course';
import { Enrollment } from '../../models/enrollment';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';

@Component({
  selector: 'lms-course-details',
  imports: [
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent {

  courseId: string | null;

  course: Course | null;

  constructor(private route: ActivatedRoute, private storage: LocalstorageService) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.loadCourseDetails();
    console.log(this.course);
  }

  private loadCourseDetails(): void {
    this.course = this.storage.getCourses()?.find(course => course.id === this.courseId) || null;
  }

  enroll(): void {
    if (this.course) {
      const enrolledCourses = this.storage.getEnrollments() || [];
      const courseExists = enrolledCourses.some(enrolledCourse => enrolledCourse.courseId === this.course?.id);
      if (!courseExists) {
        const newEnrollment = {
          userId: this.storage.getUser()?.userId,
          courseId: this.course.id,
          status: 'enrolled',
          progress: 0,
          enrolledAt: new Date().toDateString()
        } as Enrollment;
        enrolledCourses.push(newEnrollment);
        this.storage.updateEnrollments(enrolledCourses);
      } else {
        window.alert('You are already enrolled in this course.');
      }
    }
  }

}