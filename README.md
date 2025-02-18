# ENovi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
#   E N o v i 
 
 

```
ENovi
├─ .angular
├─ .editorconfig
├─ angular.json
├─ other
│  ├─ BÁO CÁO TÀI CHÍNH HỆ THỐNG BÁN KHÓA HỌC.docx
│  ├─ readme.txt
│  └─ Tiến độ hoàn thành.txt
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ font
│  └─ img
│     ├─ bank
│     ├─ banner
│     │  ├─ banner1.jpg
│     │  ├─ banner2.jpg
│     │  └─ bannerLotrinhhoc.png
│     ├─ bannerLecture.JPG
│     ├─ cover_photo_course
│     ├─ miku.png
│     ├─ paymentsLogo
│     │  ├─ bank.png
│     │  ├─ momo.png
│     │  ├─ nganluong.png
│     │  └─ paypal.png
│     ├─ UnderConstruction.jpeg
│     └─ user
│        └─ bannserUser.jpeg
├─ README.md
├─ server.ts
├─ src
│  ├─ app
│  │  ├─ app-routing.module.ts
│  │  ├─ app.component.css
│  │  ├─ app.component.html
│  │  ├─ app.component.spec.ts
│  │  ├─ app.component.ts
│  │  ├─ app.module.server.ts
│  │  ├─ app.module.ts
│  │  ├─ components
│  │  │  ├─ course-item-my-learning
│  │  │  │  ├─ course-item-my-learning.component.css
│  │  │  │  ├─ course-item-my-learning.component.html
│  │  │  │  └─ course-item-my-learning.component.ts
│  │  │  ├─ course-item-search
│  │  │  │  ├─ course-item-search.component.css
│  │  │  │  ├─ course-item-search.component.html
│  │  │  │  └─ course-item-search.component.ts
│  │  │  ├─ course-item-shopping-cart
│  │  │  │  ├─ course-item-shopping-cart.component.css
│  │  │  │  ├─ course-item-shopping-cart.component.html
│  │  │  │  └─ course-item-shopping-cart.component.ts
│  │  │  ├─ list-courses-admin
│  │  │  │  ├─ list-courses-admin.component.css
│  │  │  │  ├─ list-courses-admin.component.html
│  │  │  │  └─ list-courses-admin.component.ts
│  │  │  ├─ progress-learning
│  │  │  │  ├─ progress-learning.component.css
│  │  │  │  ├─ progress-learning.component.html
│  │  │  │  └─ progress-learning.component.ts
│  │  │  ├─ table-data-user-admin
│  │  │  │  ├─ table-data-user-admin.component.css
│  │  │  │  ├─ table-data-user-admin.component.html
│  │  │  │  └─ table-data-user-admin.component.ts
│  │  │  └─ youtube-player
│  │  │     ├─ youtube-player.component.css
│  │  │     ├─ youtube-player.component.html
│  │  │     └─ youtube-player.component.ts
│  │  ├─ features
│  │  │  ├─ admin
│  │  │  │  ├─ admin-courses
│  │  │  │  │  ├─ admin-course-detail
│  │  │  │  │  │  ├─ admin-course-detail.component.css
│  │  │  │  │  │  ├─ admin-course-detail.component.html
│  │  │  │  │  │  └─ admin-course-detail.component.ts
│  │  │  │  │  ├─ admin-courses.component.css
│  │  │  │  │  ├─ admin-courses.component.html
│  │  │  │  │  └─ admin-courses.component.ts
│  │  │  │  ├─ admin-pay
│  │  │  │  │  ├─ admin-pay.component.css
│  │  │  │  │  ├─ admin-pay.component.html
│  │  │  │  │  └─ admin-pay.component.ts
│  │  │  │  ├─ admin-revenue
│  │  │  │  │  ├─ admin-revenue.component.css
│  │  │  │  │  ├─ admin-revenue.component.html
│  │  │  │  │  └─ admin-revenue.component.ts
│  │  │  │  ├─ admin-user
│  │  │  │  │  ├─ admin-user.component.css
│  │  │  │  │  ├─ admin-user.component.html
│  │  │  │  │  └─ admin-user.component.ts
│  │  │  │  ├─ admin.component.css
│  │  │  │  ├─ admin.component.html
│  │  │  │  ├─ admin.component.ts
│  │  │  │  └─ categories
│  │  │  │     ├─ categories.component.css
│  │  │  │     ├─ categories.component.html
│  │  │  │     └─ categories.component.ts
│  │  │  ├─ course
│  │  │  │  ├─ course.component.css
│  │  │  │  ├─ course.component.html
│  │  │  │  └─ course.component.ts
│  │  │  ├─ forgot-password
│  │  │  │  ├─ forgot-password.component.css
│  │  │  │  ├─ forgot-password.component.html
│  │  │  │  └─ forgot-password.component.ts
│  │  │  ├─ home
│  │  │  │  ├─ home.component.css
│  │  │  │  ├─ home.component.html
│  │  │  │  └─ home.component.ts
│  │  │  ├─ lecture
│  │  │  │  ├─ lecture.component.css
│  │  │  │  ├─ lecture.component.html
│  │  │  │  └─ lecture.component.ts
│  │  │  ├─ login
│  │  │  │  ├─ login.component.css
│  │  │  │  ├─ login.component.html
│  │  │  │  └─ login.component.ts
│  │  │  ├─ my-learning
│  │  │  │  ├─ my-learning.component.css
│  │  │  │  ├─ my-learning.component.html
│  │  │  │  └─ my-learning.component.ts
│  │  │  ├─ notfound
│  │  │  │  ├─ notfound.component.css
│  │  │  │  ├─ notfound.component.html
│  │  │  │  └─ notfound.component.ts
│  │  │  ├─ payment
│  │  │  │  ├─ payment.component.css
│  │  │  │  ├─ payment.component.html
│  │  │  │  └─ payment.component.ts
│  │  │  ├─ register
│  │  │  │  ├─ register.component.css
│  │  │  │  ├─ register.component.html
│  │  │  │  └─ register.component.ts
│  │  │  ├─ search
│  │  │  │  ├─ search.component.css
│  │  │  │  ├─ search.component.html
│  │  │  │  └─ search.component.ts
│  │  │  ├─ shopping-cart
│  │  │  │  ├─ shopping-cart.component.css
│  │  │  │  ├─ shopping-cart.component.html
│  │  │  │  └─ shopping-cart.component.ts
│  │  │  └─ user
│  │  │     ├─ courses-of-instructor
│  │  │     │  ├─ course-new
│  │  │     │  │  ├─ course-new.component.css
│  │  │     │  │  ├─ course-new.component.html
│  │  │     │  │  └─ course-new.component.ts
│  │  │     │  ├─ course-update
│  │  │     │  │  ├─ course-update.component.css
│  │  │     │  │  ├─ course-update.component.html
│  │  │     │  │  └─ course-update.component.ts
│  │  │     │  ├─ courses-of-instructor.component.css
│  │  │     │  ├─ courses-of-instructor.component.html
│  │  │     │  └─ courses-of-instructor.component.ts
│  │  │     ├─ delete-account
│  │  │     │  ├─ delete-account.component.css
│  │  │     │  ├─ delete-account.component.html
│  │  │     │  └─ delete-account.component.ts
│  │  │     ├─ edit-instructor-profile
│  │  │     │  ├─ basic-information
│  │  │     │  │  ├─ basic-information.component.css
│  │  │     │  │  ├─ basic-information.component.html
│  │  │     │  │  └─ basic-information.component.ts
│  │  │     │  ├─ edit-instructor-profile.component.css
│  │  │     │  ├─ edit-instructor-profile.component.html
│  │  │     │  ├─ edit-instructor-profile.component.ts
│  │  │     │  └─ update-photo
│  │  │     │     ├─ update-photo.component.css
│  │  │     │     ├─ update-photo.component.html
│  │  │     │     └─ update-photo.component.ts
│  │  │     ├─ edit-user-info
│  │  │     │  ├─ basic-info-user
│  │  │     │  │  ├─ basic-info-user.component.css
│  │  │     │  │  ├─ basic-info-user.component.html
│  │  │     │  │  └─ basic-info-user.component.ts
│  │  │     │  ├─ edit-user-info.component.css
│  │  │     │  ├─ edit-user-info.component.html
│  │  │     │  ├─ edit-user-info.component.ts
│  │  │     │  └─ upload-photo-user
│  │  │     │     ├─ upload-photo-user.component.css
│  │  │     │     ├─ upload-photo-user.component.html
│  │  │     │     └─ upload-photo-user.component.ts
│  │  │     ├─ instructor-profile
│  │  │     │  ├─ instructor-profile.component.css
│  │  │     │  ├─ instructor-profile.component.html
│  │  │     │  └─ instructor-profile.component.ts
│  │  │     ├─ message
│  │  │     │  ├─ message.component.css
│  │  │     │  ├─ message.component.html
│  │  │     │  └─ message.component.ts
│  │  │     ├─ payments
│  │  │     │  ├─ payments.component.css
│  │  │     │  ├─ payments.component.html
│  │  │     │  ├─ payments.component.ts
│  │  │     │  ├─ receive
│  │  │     │  │  ├─ receive.component.css
│  │  │     │  │  ├─ receive.component.html
│  │  │     │  │  └─ receive.component.ts
│  │  │     │  └─ transfer
│  │  │     │     ├─ transfer.component.css
│  │  │     │     ├─ transfer.component.html
│  │  │     │     └─ transfer.component.ts
│  │  │     ├─ purchase-history
│  │  │     │  ├─ purchase-history.component.css
│  │  │     │  ├─ purchase-history.component.html
│  │  │     │  └─ purchase-history.component.ts
│  │  │     ├─ ratting-instructor
│  │  │     │  ├─ ratting-instructor.component.css
│  │  │     │  ├─ ratting-instructor.component.html
│  │  │     │  └─ ratting-instructor.component.ts
│  │  │     ├─ revenue
│  │  │     │  ├─ revenue.component.css
│  │  │     │  ├─ revenue.component.html
│  │  │     │  └─ revenue.component.ts
│  │  │     ├─ security
│  │  │     │  ├─ security.component.css
│  │  │     │  ├─ security.component.html
│  │  │     │  └─ security.component.ts
│  │  │     ├─ user-profile
│  │  │     │  ├─ user-profile.component.css
│  │  │     │  ├─ user-profile.component.html
│  │  │     │  └─ user-profile.component.ts
│  │  │     ├─ user.component.css
│  │  │     ├─ user.component.html
│  │  │     └─ user.component.ts
│  │  ├─ interface
│  │  │  ├─ course.ts
│  │  │  └─ section.ts
│  │  ├─ services
│  │  │  ├─ api.service.spec.ts
│  │  │  └─ api.service.ts
│  │  └─ shared
│  │     ├─ footer
│  │     │  ├─ footer.component.css
│  │     │  ├─ footer.component.html
│  │     │  └─ footer.component.ts
│  │     └─ header
│  │        ├─ header.component.css
│  │        ├─ header.component.html
│  │        └─ header.component.ts
│  ├─ index.html
│  ├─ main.server.ts
│  ├─ main.ts
│  ├─ server.ts
│  ├─ styles.css
│  └─ stylesCustom.css
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.spec.json
└─ vite-project

```
