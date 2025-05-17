import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Course } from '../../models/course';
import { Enrollment } from '../../models/enrollment';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';

export interface PeriodicElement {
  id: string;
  title: string;
  status: string;
  progress: number;
}

@Component({
  selector: 'lms-my-learning',
  imports: [MatTableModule],
  templateUrl: './my-learning.component.html',
  styleUrl: './my-learning.component.scss'
})
export class MyLearningComponent {

  enrollments: Enrollment[] | null;

  dataSource: any;

  constructor(private storage: LocalstorageService) { }

  ngOnInit() {
    this.enrollments = this.storage.getEnrollments();
    this.dataSource = this.getData();
  }

  private getData(): PeriodicElement[] {
    const data: PeriodicElement[] = [];
    if (this.enrollments) {
      this.enrollments.forEach((enrollment) => {
        const course = this.getCourse(enrollment.courseId);
        data.push({
          id: enrollment.courseId,
          title: course?.title || '',
          status: course?.isFree ? 'Free' : 'Paid',
          progress: enrollment.progress
        });
      });
    }
    return data;
  }

  private getCourse(courseId: string): Course | undefined {
    const courses = this.storage.getCourses();
    return courses?.find((c) => c.id === courseId);
  }

  updateProgress(courseId: string, event: any) {
    const enrollment = this.enrollments?.find((e) => e.courseId === courseId);
    if (enrollment) {
      enrollment.progress = event.target.value;
      if (enrollment.progress === 100) {
        enrollment.status = 'completed';
        enrollment.completedAt = new Date().toString();
      }
      this.storage.updateEnrollments(this.enrollments || []);
    }
    const data = this.dataSource.find((d: PeriodicElement) => d.id === courseId);
    if (data) {
      data.progress = event.target.value;
    }
  }

}