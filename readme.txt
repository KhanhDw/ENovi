khởi tạo dự án angular:   ng new <name app> --no-standalone
lệnh run app          :   ng serve -o

Nếu code 2 project trong Tabs Explorer: thì cần cd để thư mục angular rồi chạy lệnh run server



lệnh khởi tạo component:::  ng generate component <name> --path=src/app --skip-import --skip-tests

lệnh khởi tạo component tại đường dẫn hiện tại::: ng generate component <name>  --skip-import --skip-tests

hoặc rút gọn câu lệnh:    ng g c <name> --path=src/app --skipTests

lệnh khởi tạo service:    ng generate service <name> --path=src/app --skip-import --skip-tests
hoặc rút gọn câu lệnh:    ng g s <name> --path=src/app --skipTests

"--skipTests" là bỏ file .spec.ts

lệnh tạo module mới trong 1 component: ng generate module --module app


khi dùng tailwind muốn cập nhật font thì: npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
