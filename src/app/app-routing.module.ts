import { RegisterInstructorComponent } from './features/user/register-instructor/register-instructor.component';
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
import { PaymentComponent } from './features/payment/payment.component';
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
import { PaymentsComponent } from './features/user/payments/payments.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { CourseNewComponent } from './features/user/courses-of-instructor/course-new/course-new.component';
import { CategoriesComponent } from './features/admin/categories/categories.component';
import { AuthCallbackComponent } from './components/System/auth-callback/auth-callback.component';
import { ResetPasswordComponent } from './features/reset-password/reset-password.component';
import { PaymentStatusComponent } from './features/payment/payment-status/payment-status.component';
//service prevent reload page

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'auth/callback', component: AuthCallbackComponent }, // đặc biệt dùng để nhận call back từ goolge gửi về

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'my-learning', component: MyLearningComponent },
  { path: 'course/:id/:title', component: CourseComponent },
  {
    path: 'payment',
    component: PaymentComponent,
  },
  { path: 'payment/:status', component: PaymentStatusComponent },
  {
    path: 'course/:title/lecture',
    component: LectureComponent,
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
          { path: 'register', component: RegisterInstructorComponent },
          {
            path: 'courses-instructor',
            component: CoursesOfInstructorComponent,
          },
          {
            path: 'courses-instructor',
            children: [
              { path: 'update/:title', component: CourseUpdateComponent },
              { path: 'new', component: CourseNewComponent },
            ],
          },
          { path: 'revenue', component: RevenueComponent },
          { path: 'ratting', component: RattingInstructorComponent },
          { path: 'message', component: MessageComponent },
          {
            path: 'profile',
            component: InstructorProfileComponent,
          },
          {
            path: 'profile',
            children: [
              {
                path: 'updateInfo',
                component: EditInstructorProfileComponent,
                children: [
                  {
                    path: '',
                    redirectTo: 'basic-information',
                    pathMatch: 'full',
                  }, // Chuyển hướng mặc định khi vào /instructor
                  {
                    path: 'basic-information',
                    component: BasicInformationComponent,
                  },
                  { path: 'photo', component: UpdatePhotoComponent },
                ],
              },
            ],
          },

          {
            path: 'payments',
            component: PaymentsComponent,
            children: [
              { path: 'recive', component: ReceiveComponent },
              { path: 'transfer', component: TransferComponent },
              { path: '', redirectTo: 'recive', pathMatch: 'full' },
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
      { path: '', redirectTo: 'courses', pathMatch: 'full' },
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
      { path: 'categories', component: CategoriesComponent },
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
