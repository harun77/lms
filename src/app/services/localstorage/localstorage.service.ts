import { Injectable } from '@angular/core';
import { Course } from '../../models/course';
import { Enrollment } from '../../models/enrollment';
import { LocalStorageData } from '../../models/local-storage-data';
import { User } from '../../models/user';
import { localStorageData } from './data';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  initData(): void {
    localStorage.setItem('data', JSON.stringify(localStorageData));
  }

  getData(): LocalStorageData | null {
    const data = localStorage.getItem('data');
    return data ? JSON.parse(data) : null;
  }

  getUser(): User | null {
    const data = this.getData();
    return data ? data.user : null;
  }

  getCourses(): Course[] | null {
    const data = this.getData();
    return data ? data.courses : null;
  }

  getEnrollments(): Enrollment[] | null {
    const data = this.getData();
    return data ? data.enrollments : null;
  }

  updateUser(user: User): void {
    const data = this.getData();
    if (data) {
      data.user = user;
      localStorage.setItem('data', JSON.stringify(data));
    }
  }

  updateEnrollments(enrollments: Enrollment[]): void {
    const data = this.getData();
    if (data) {
      data.enrollments = enrollments;
      localStorage.setItem('data', JSON.stringify(data));
    }
  }

}