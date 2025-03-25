-- cách public website 
cài đặt: npm install -g localtunnel 
public website với port đang dùng: lt --port 4200 --subdomain <đặt tên web>

--> lưu ý: đảm bảo Angular app đang chạy trên port 4200 trước khi chạy lệnh localtunnel. 
    Kiểm tra bằng cách mở trình duyệt và truy cập http://localhost:4200.

mở terminal cmd lấy password vào web: curl https://loca.lt/mytunnelpassword

-- một cách run angular khác 
ng serve --host 0.0.0.0 
hoặc
ng serve --host 0.0.0.0 --disable-host-check
hoặc
ng serve --host 0.0.0.0 --no-hmr --public-host=https://my-app.loca.lt
ng serve --host 0.0.0.0 --no-hmr --public-host=https://enovi.loca.lt



--> với cách này sẽ cho ip của máy thành web

--> lưu ý thêm: 
    - Nếu tắt localtunnel, có thể truy cập ngay vào http://localhost:4200/.
    - Nếu bật localtunnel, có thể gặp tình trạng không load được trang tại http://localhost:4200/.