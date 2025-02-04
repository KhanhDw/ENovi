import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { SearchComponent } from './features/search/search.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ShoppingCartComponent } from './features/shopping-cart/shopping-cart.component';
import { MyLearningComponent } from './features/my-learning/my-learning.component';
import { LectureComponent } from './features/lecture/lecture.component';
import { CourseComponent } from './features/course/course.component';
import { SettingComponent } from './features/setting/setting.component';
import { CoursesOfInstructorComponent } from './features/setting/courses-of-instructor/courses-of-instructor.component';
import { RevenueComponent } from './features/setting/revenue/revenue.component';
import { MessageComponent } from './features/setting/message/message.component';
import { CourseUpdateComponent } from './features/setting/courses-of-instructor/course-update/course-update.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'my-learning', component: MyLearningComponent },
  { path: 'course', component: CourseComponent },
  { path: 'lecture', component: LectureComponent },
  {
    path: 'setting',
    component: SettingComponent,
    children: [
      {
        path: 'courses-instructor',
        component: CoursesOfInstructorComponent,
        children: [{ path: 'course-update', component: CourseUpdateComponent }],
      },
      {
        path: 'revenue',
        component: RevenueComponent,
      },
      { path: 'message', component: MessageComponent },
    ],
  },
  { path: 'notfound', component: NotfoundComponent },
  // phải luôn đặt ** tại cuối vì theo trình tự biên dịch từ trên muốn
  { path: '**', redirectTo: 'notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
