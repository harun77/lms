import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Course } from '../../models/course';
import { Enrollment } from '../../models/enrollment';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  title: string;
  category: string;
  completedAt: string;
}

@Component({
  selector: 'lms-learning-history',
  imports: [MatTableModule, CommonModule],
  templateUrl: './learning-history.component.html',
  styleUrl: './learning-history.component.scss'
})
export class LearningHistoryComponent {

  enrollments: Enrollment[] | null;

  displayedColumns: string[] = ['title', 'category', 'completedAt'];

  dataSource: any;

  totalCompletedCourses: number;

  totalCompletedHours: number;

  constructor(private storage: LocalstorageService) { }

  ngOnInit() {
    this.totalCompletedCourses = 0;
    this.totalCompletedHours = 0;
    this.enrollments = this.storage.getEnrollments();
    this.dataSource = this.getHistoryData();
  }

  private getHistoryData(): PeriodicElement[] {
    const historyData: PeriodicElement[] = [];
    if (this.enrollments) {
      this.enrollments.forEach((enrollment) => {
        if (enrollment.completedAt) {
          const course = this.getCourse(enrollment.courseId);
          this.totalCompletedCourses++;
          if (course) {
            this.totalCompletedHours += course?.duration;
          }
          historyData.push({
            title: course?.title || '',
            category: course?.category || '',
            completedAt: enrollment.completedAt
          });
        }
      });
    }
    return historyData;
  }

  private getCourse(courseId: string): Course | undefined {
    const courses = this.storage.getCourses();
    return courses?.find((c) => c.id === courseId);
  }

}