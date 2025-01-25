import { NgModule, Component } from '@angular/core';
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
import { SearchComponent } from './features/search/search.component';
import { RegisterComponent } from './features/register/register.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { MyLearningComponent } from './features/my-learning/my-learning.component';
import { ShoppingCartComponent } from './features/shopping-cart/shopping-cart.component';
import { CourseDetailComponent } from './features/course-detail/course-detail.component';
import { CourseItemSearchComponent } from './components/course-item-search/course-item-search.component';
import { CourseItemMyLearningComponent } from './components/course-item-my-learning/course-item-my-learning.component';
import { CourseItemShoppingCartComponent } from './components/course-item-shopping-cart/course-item-shopping-cart.component';

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
    CourseDetailComponent,
    // components
    CourseItemSearchComponent,
    CourseItemShoppingCartComponent,
    CourseItemMyLearningComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
