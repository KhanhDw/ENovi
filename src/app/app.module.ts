import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts'; // Import đúng cách

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

@NgModule({
  declarations: [
    AppComponent,
    // partial
    HeaderComponent,
    FooterComponent,
    // page
    LoginComponent,
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
    TransferComponent,
    // components
    YoutubePlayerComponent,
    CourseItemSearchComponent,
    ProgressLearningComponent,
    CourseItemMyLearningComponent,
    CourseItemShoppingCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
