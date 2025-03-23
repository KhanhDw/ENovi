import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';

import { AuthGoogleServiceService } from './authGoogle/auth-google-service.service';
import { ForgotPasswordServiceService } from './fogot_password/forgot-password-service.service';
import { UserServiceService } from './user/user-service.service';
import { ResetPasswordService } from './reset_password/reset-password.service';
import { LoginServiceService } from './login/login-service.service';
import { RegisterServiceService } from './register/register-service.service';
import { CategoriesServiceService } from './category/categories-service.service';
import { SearchServiceService } from './search/search-service.service';
import { CourseDetailServiceService } from './course_detail/course-detail-service.service';
import { CourseInstructorService } from './course_Instructor/course-instructor.service';
import { UploadImgServerService } from './upload_img_server/upload-img-server.service';
import { ListLanguageServiceService } from './languages/list-language-service.service';
import { UploadVideoService } from './upload_video/upload-video.service';
import { AdminUserService } from './admin/user/admin-user.service';
import { AdminCategoryService } from './admin/category/admin-category.service';
import { AdminCourseService } from './admin/course/admin-course.service';
import { CartService } from './cart/cart.service';
import { MyLearningService } from './my-learning/my-learning.service';
import { EnrollmentService } from './enrollment/enrollment.service';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public API_URL = 'https://localhost:3000';

  constructor(
    private http: HttpClient,
    public authGoogleServiceService: AuthGoogleServiceService,
    public forgotPasswordServiceService: ForgotPasswordServiceService,
    public userServiceService: UserServiceService,
    public resetPasswordService: ResetPasswordService,
    public loginServiceService: LoginServiceService,
    public registerServiceService: RegisterServiceService,
    public categoriesServiceService: CategoriesServiceService,
    public searchServiceService: SearchServiceService,
    public courseDetailServiceService: CourseDetailServiceService,
    public courseInstructorService: CourseInstructorService,
    public uploadImgServerService: UploadImgServerService,
    public listLanguageServiceService: ListLanguageServiceService,
    public uploadVideoService: UploadVideoService,
    public adminUserService: AdminUserService,
    public adminCategoryService: AdminCategoryService,
    public adminCourseService: AdminCourseService,
    public cartService: CartService,
    public myLearningService: MyLearningService,
    public enrollmentService: EnrollmentService
  ) {
    this.loginServiceService.setApiUrl(`${this.API_URL}/login`);
    this.authGoogleServiceService.setApiUrl(`${this.API_URL}/auth`);
    this.forgotPasswordServiceService.setApiUrl(`${this.API_URL}/fopass`);
    this.resetPasswordService.setApiUrl(`${this.API_URL}/repass`);
    this.userServiceService.setApiUrl(`${this.API_URL}/user`);
    this.registerServiceService.setApiUrl(`${this.API_URL}/register`);
    this.categoriesServiceService.setApiUrl(`${this.API_URL}/categories`);
    this.searchServiceService.setApiUrl(`${this.API_URL}/search`);
    this.courseDetailServiceService.setApiUrl(`${this.API_URL}/course`);
    this.courseInstructorService.setApiUrl(`${this.API_URL}/course`);
    this.listLanguageServiceService.setApiUrl(`${this.API_URL}/languages`);
    this.adminUserService.setApiUrl(`${this.API_URL}/admin/user`);
    this.adminCategoryService.setApiUrl(`${this.API_URL}/admin/category`);
    this.adminCourseService.setApiUrl(`${this.API_URL}/admin/course`);
    this.cartService.setApiUrl(`${this.API_URL}/cart`);
    // my learning
    this.myLearningService.setApiUrl(`${this.API_URL}/my-learning`);
     // enrollment
     this.enrollmentService.setApiUrl(`${this.API_URL}/enrollment`);

    // đặc biệt
    // upload
    this.uploadImgServerService.setApiUrl(`${this.API_URL}/upload-img`);
    // upload video
    this.uploadVideoService.setApiUrl(`${this.API_URL}/upload-video`);
   
  }
}
