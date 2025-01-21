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
import { CourseItemComponent } from './components/course-item/course-item.component';
import { ShoppingCartComponent } from './features/shopping-cart/shopping-cart.component';
import { CourseItemSearchComponent } from './components/course-item-search/course-item-search.component';
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
    // components
    CourseItemComponent,
    CourseItemSearchComponent,
    CourseItemShoppingCartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
