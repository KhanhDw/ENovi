import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
import { SettingComponent } from './features/setting/setting.component';
import { CoursesOfInstructorComponent } from './features/setting/courses-of-instructor/courses-of-instructor.component';
import { RevenueComponent } from './features/setting/revenue/revenue.component';
import { MessageComponent } from './features/setting/message/message.component';
import { CourseUpdateComponent } from './features/setting/courses-of-instructor/course-update/course-update.component';

import { QuillModule } from 'ngx-quill';

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
    SettingComponent,
    CoursesOfInstructorComponent,
    RevenueComponent,
    MessageComponent,
    CourseUpdateComponent,
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
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
