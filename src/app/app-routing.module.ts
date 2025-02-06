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
    path: 'user',
    component: userComponent,
    children: [
      { path: '', redirectTo: 'courses-instructor', pathMatch: 'full' },
      {
        path: 'courses-instructor',
        component: CoursesOfInstructorComponent,
        children: [{ path: 'course-update', component: CourseUpdateComponent }],
      },
      { path: 'revenue', component: RevenueComponent },
      { path: 'message', component: MessageComponent },
      { path: 'purchase-history', component: PurchaseHistoryComponent },
      { path: 'instructor-profile', component: InstructorProfileComponent },
      {
        path: 'payments',
        component: PaymentsComponent,
        children: [
          { path: 'recive', component: ReceiveComponent },
          { path: 'transfer', component: TransferComponent },
        ],
      },
      {
        path: 'instructor',
        component: EditInstructorProfileComponent,
        // // 🚨 Bỏ component: EditInstructorProfileComponent ở đây - để router-outlet không lòng componentCha(componentCha(componentCon))
        // vì khi render component con sẽ lấy luôn component cha
        children: [
          { path: '', redirectTo: 'basic-information', pathMatch: 'full' }, // Chuyển hướng mặc định khi vào /instructor
          { path: 'basic-information', component: BasicInformationComponent },
          { path: 'photo', component: UpdatePhotoComponent },
        ],
      },
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
