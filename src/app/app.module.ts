import { CategoriesComponent } from './features/admin/categories/categories.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import module này
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts'; // Import đúng cách
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { CourseComponent } from './features/course/course.component';
import { SearchComponent } from './features/search/search.component';
import { LectureComponent } from './features/lecture/lecture.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { RegisterComponent } from './features/register/register.component';
import { MyLearningComponent } from './features/my-learning/my-learning.component';
import { ShoppingCartComponent } from './features/shopping-cart/shopping-cart.component';
import { CourseItemSearchComponent } from './components/course-item-search/course-item-search.component';
import { CourseItemMyLearningComponent } from './components/course-item-my-learning/course-item-my-learning.component';
import { CourseItemShoppingCartComponent } from './components/course-item-shopping-cart/course-item-shopping-cart.component';
import { ProgressLearningComponent } from './components/progress-learning/progress-learning.component';
import { YoutubePlayerComponent } from './components/youtube-player/youtube-player.component';
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
import { TableDataUserAdminComponent } from './components/table-data-user-admin/table-data-user-admin.component';
import { ListCoursesAdminComponent } from './components/list-courses-admin/list-courses-admin.component';
import { AdminCourseDetailComponent } from './features/admin/admin-courses/admin-course-detail/admin-course-detail.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { CourseNewComponent } from './features/user/courses-of-instructor/course-new/course-new.component';
import { AuthCallbackComponent } from './components/System/auth-callback/auth-callback.component';
import { ResetPasswordComponent } from './features/reset-password/reset-password.component';
import { RegisterInstructorComponent } from './features/user/register-instructor/register-instructor.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CommentCourseComponent } from './components/comment-course/comment-course.component';

@NgModule({
  declarations: [
    AppComponent,
    // partial
    HeaderComponent,
    FooterComponent,
    // page
    CategoriesComponent,
    CourseNewComponent,
    AdminUserComponent,
    AdminRevenueComponent,
    AdminCoursesComponent,
    AdminPayComponent,
    LoginComponent,
    RattingInstructorComponent,
    RegisterComponent,
    HomeComponent,
    SearchComponent,
    NotfoundComponent,
    ShoppingCartComponent,
    MyLearningComponent,
    CourseComponent,
    LectureComponent,
    userComponent,
    CoursesOfInstructorComponent,
    RevenueComponent,
    MessageComponent,
    CourseUpdateComponent,
    userComponent,
    CoursesOfInstructorComponent,
    RevenueComponent,
    MessageComponent,
    CourseUpdateComponent,
    InstructorProfileComponent,
    PurchaseHistoryComponent,
    EditInstructorProfileComponent,
    UpdatePhotoComponent,
    PaymentsComponent,
    BasicInformationComponent,
    ReceiveComponent,
    SecurityComponent,
    TransferComponent,
    DeleteAccountComponent,
    EditUserInfoComponent,
    BasicInfoUserComponent,
    UserProfileComponent,
    AdminComponent,
    UploadPhotoUserComponent,
    PaymentsComponent,
    AdminCourseDetailComponent,
    ForgotPasswordComponent,

    // components
    YoutubePlayerComponent,
    CourseItemSearchComponent,
    ProgressLearningComponent,
    CourseItemMyLearningComponent,
    CourseItemShoppingCartComponent,
    TableDataUserAdminComponent,
    ListCoursesAdminComponent,
    AuthCallbackComponent,
    ResetPasswordComponent,
    RegisterInstructorComponent,
    PaginationComponent,
    CommentCourseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    NgApexchartsModule,
    MatSnackBarModule,
  ],
  
  providers: [provideClientHydration(),  provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
