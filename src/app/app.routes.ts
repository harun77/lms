import { Routes } from '@angular/router';
import { CourseCatalogComponent } from './components/course-catalog/course-catalog.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { MyLearningComponent } from './components/my-learning/my-learning.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { LearningHistoryComponent } from './components/learning-history/learning-history.component';

export const routes: Routes = [
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: 'courses', component: CourseCatalogComponent },
    { path: 'course-details/:id', component: CourseDetailsComponent },
    { path: 'my-learning', component: MyLearningComponent },
    { path: 'my-profile', component: MyProfileComponent },
    { path: 'learning-history', component: LearningHistoryComponent },
];