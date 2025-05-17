import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Course } from '../../models/course';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lms-course-catalog',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './course-catalog.component.html',
  styleUrl: './course-catalog.component.scss'
})
export class CourseCatalogComponent {

  courses: Course[];

  filteredCourses: Course[];

  searchText: string;

  constructor(private storage: LocalstorageService, private router: Router) { }

  ngOnInit() {
    this.loadCourses();
  }

  private loadCourses() {
    this.courses = this.storage.getCourses() || [];
    this.filteredCourses = this.courses;
  }

  details(courseId: string): void {
    this.router.navigate(['/course-details', courseId]);
  }

  allCourses(event: any): void {
    const checked = event.target['checked'];
    if (checked) {
      this.filteredCourses = this.courses;
    } else {
      this.filteredCourses = [];
    }
  }

  freeCourses(event: any): void {
    const checked = event.target['checked'];
    if (checked) {
      let courses = this.courses.filter(course => course.isFree);
      this.filteredCourses.push(...courses);
      courses = [... new Set(this.filteredCourses)];
      this.filteredCourses = courses;
    } else {
      this.filteredCourses = this.filteredCourses.filter(course => !course.isFree);
    }
  }

  paidCourses(event: any): void {
    const checked = event.target['checked'];
    if (checked) {
      let courses = this.courses.filter(course => !course.isFree);
      this.filteredCourses.push(...courses);
      courses = [... new Set(this.filteredCourses)];
      this.filteredCourses = courses;
    } else {
      this.filteredCourses = this.filteredCourses.filter(course => course.isFree);
    }
  }

  programmingCourses(event: any): void {
    const checked = event.target['checked'];
    if (checked) {
      let courses = this.courses.filter(course => course.category.includes('Programming'));
      this.filteredCourses.push(...courses);
      courses = [... new Set(this.filteredCourses)];
      this.filteredCourses = courses;
    } else {
      this.filteredCourses = this.filteredCourses.filter(course => !course.category.includes('Programming'));
    }
  }

  businessCourses(event: any): void {
    const checked = event.target['checked'];
    if (checked) {
      let courses = this.courses.filter(course => course.category.includes('Business'));
      this.filteredCourses.push(...courses);
      courses = [... new Set(this.filteredCourses)];
      this.filteredCourses = courses;
    } else {
      this.filteredCourses = this.filteredCourses.filter(course => !course.category.includes('Business'));
    }
  }

  marketingCourses(event: any): void {
    const checked = event.target['checked'];
    if (checked) {
      let courses = this.courses.filter(course => course.category.includes('Marketing'));
      this.filteredCourses.push(...courses);
      courses = [... new Set(this.filteredCourses)];
      this.filteredCourses = courses;
    } else {
      this.filteredCourses = this.filteredCourses.filter(course => !course.category.includes('Marketing'));
    }
  }

  search(): void {
    this.filteredCourses = this.courses.filter(course => {
      return course.title.toLowerCase().includes(this.searchText) || course.description.toLowerCase().includes(this.searchText);
    });
  }

}