import { Component, NgModule } from '@angular/core';
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
import { userComponent } from './features/user/user.component';
import { CoursesOfInstructorComponent } from './features/user/courses-of-instructor/courses-of-instructor.component';
import { RevenueComponent } from './features/user/revenue/revenue.component';
import { MessageComponent } from './features/user/message/message.component';
import { CourseUpdateComponent } from './features/user/courses-of-instructor/course-update/course-update.component';
import { PurchaseHistoryComponent } from './features/user/purchase-history/purchase-history.component';
import { InstructorProfileComponent } from './features/user/instructor-profile/instructor-profile.component';
import { EditInstructorProfileComponent } from './features/user/edit-instructor-profile/edit-instructor-profile.component';
import { UpdatePhotoComponent } from './features/user/edit-instructor-profile/update-photo/update-photo.component';
import { BasicInformationComponent } from './features/user/edit-instructor-profile/basic-information/basic-information.component';
import { PaymentsComponent } from './features/user/payments/payments.component';
import { ReceiveComponent } from './features/user/payments/receive/receive.component';
import { TransferComponent } from './features/user/payments/transfer/transfer.component';
import { SecurityComponent } from './features/user/security/security.component';
import { DeleteAccountComponent } from './features/user/delete-account/delete-account.component';
import { EditUserInfoComponent } from './features/user/edit-user-info/edit-user-info.component';
import { BasicInfoUserComponent } from './features/user/edit-user-info/basic-info-user/basic-info-user.component';
import { UploadPhotoUserComponent } from './features/user/edit-user-info/upload-photo-user/upload-photo-user.component';
import { UserProfileComponent } from './features/user/user-profile/user-profile.component';
import { RattingInstructorComponent } from './features/user/ratting-instructor/ratting-instructor.component';
import { AdminComponent } from './features/admin/admin.component';
import { AdminUserComponent } from './features/admin/admin-user/admin-user.component';
import { AdminRevenueComponent } from './features/admin/admin-revenue/admin-revenue.component';
import { AdminCoursesComponent } from './features/admin/admin-courses/admin-courses.component';
import { AdminPayComponent } from './features/admin/admin-pay/admin-pay.component';
import { AdminCourseDetailComponent } from './features/admin/admin-courses/admin-course-detail/admin-course-detail.component';
import path from 'path';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'my-learning', component: MyLearningComponent },
  { path: 'course', component: CourseComponent },

  {
    path: 'course',
    children: [{ path: 'lecture', component: LectureComponent }],
  },

  // =====
  // user
  // =====

  {
    path: 'user',
    component: userComponent,
    children: [
      { path: '', redirectTo: 'edit-information', pathMatch: 'full' },
      // =====
      // user
      // =====
      { path: 'security', component: SecurityComponent },
      {
        path: 'edit-information',
        component: EditUserInfoComponent,
        children: [
          { path: '', redirectTo: 'basic-information', pathMatch: 'full' }, // Chuyển hướng mặc định khi vào /instructor
          { path: 'basic-information', component: BasicInfoUserComponent },
          { path: 'photo', component: UploadPhotoUserComponent },
        ],
      },
      { path: 'delete-account', component: DeleteAccountComponent },
      { path: 'purchase-history', component: PurchaseHistoryComponent },
      { path: 'profile', component: UserProfileComponent },

      // ==========
      // isntructor
      // ==========
      {
        path: 'instructor',
        children: [
          { path: '', redirectTo: 'courses-instructor', pathMatch: 'full' },
          {
            path: 'courses-instructor',
            component: CoursesOfInstructorComponent,
          },
          {
            path: 'courses-instructor',
            children: [
              { path: 'course-update', component: CourseUpdateComponent },
            ],
          },
          { path: 'revenue', component: RevenueComponent },
          { path: 'ratting', component: RattingInstructorComponent },
          { path: 'message', component: MessageComponent },
          { path: 'profile', component: InstructorProfileComponent },

          {
            path: 'payments',
            component: PaymentsComponent,
            children: [
              { path: 'recive', component: ReceiveComponent },
              { path: 'transfer', component: TransferComponent },
              { path: '', redirectTo: 'recive', pathMatch: 'full' },
            ],
          },
          {
            path: 'updateInfo',
            component: EditInstructorProfileComponent,
            children: [
              { path: '', redirectTo: 'basic-information', pathMatch: 'full' }, // Chuyển hướng mặc định khi vào /instructor
              {
                path: 'basic-information',
                component: BasicInformationComponent,
              },
              { path: 'photo', component: UpdatePhotoComponent },
            ],
          },
        ],
      },
    ],
  },

  // =====
  // admin
  // =====
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'courses',
        component: AdminCoursesComponent,
      },
      {
        path: 'courses',
        children: [
          {
            path: 'detail',
            component: AdminCourseDetailComponent,
          },
        ],
      },

      { path: 'user', component: AdminUserComponent },
      { path: 'revenue', component: AdminRevenueComponent },
      { path: 'pay', component: AdminPayComponent },
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
