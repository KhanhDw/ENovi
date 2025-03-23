khởi tạo dự án angular:   ng new <name app> --no-standalone
lệnh run app          :   ng serve -o

Nếu code 2 project trong Tabs Explorer: thì cần cd để thư mục angular rồi chạy lệnh run server



lệnh khởi tạo component:::  
--> ng generate component <name> --path=src/app --skip-import --skip-tests

lệnh khởi tạo component tại đường dẫn hiện tại::: 
--> ng generate component <name>  --skip-import --skip-tests
--> ng generate component <name>  --skip-tests

hoặc rút gọn câu lệnh:    ng g c <name> --path=src/app --skipTests

lệnh khởi tạo service:    ng generate service <name> --path=src/app --skip-import --skip-tests
hoặc rút gọn câu lệnh:    ng g s <name> --path=src/app --skipTests

"--skipTests" là bỏ file .spec.ts

lệnh tạo module mới trong 1 component: ng generate module --module app


khi dùng tailwind muốn cập nhật font thì: npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
trong angular thì thì file style.css là css chính: ==> npx tailwindcss -i ./src/styles.css -o ./src/stylesCustom.css --watch

lệnh tạo interface::
--> ng generate interface <name>

lệnh tạo service::
--> ng generate service <name-service>


lệnh kiểm tra phiên bản của một thư viện:
--> npm view <tên thư viện> versions


một số thư viện đã dùng từ bên ngoài:
npm i apexcharts@latest  ng-apexcharts@latest  ngx-quill@latest  quill@latest





-- chạy ssr trong angular.json
"prerender": false,  




git trên vsc 
-> Mở Settings (Ctrl + ,)
  -> "git.enabled": false
  -> "git.autoRefresh": false

+> điều này làm giảm tiến trình tăng tốc độ sử lý của vsc


this.router
.navigate(['/course', id, encodeURIComponent(title)])
.then(() => {
  window.location.reload(); // đến trang tiếp theo và reload
});


// cập nhật danh sách UI ngay lập tức, sịn xò với dữ liệu array lớn
-- trong file.component.html
*ngFor="let item of updateCourse.section; trackBy: trackByFn"

-- trong file.component.ts
trackByFn(index: number, item: any): number {
  return item.id; // Dùng `id` làm khóa nhận diện
}


chưa thể tối ưu hiệu suất cho web. và còn một số lỗi liên quan như:
  Sử dụng quá nhiều ZoneAwarePromise,
  Nhiều module được giữ trong bộ nhớ,
  Các sự kiện chưa được dọn dẹp,
  Module liên quan đến UI, animation, và DOM,
  một số pending activities không được giải phóng
điều này gây ra lỗi JavaScript heap out of memory,