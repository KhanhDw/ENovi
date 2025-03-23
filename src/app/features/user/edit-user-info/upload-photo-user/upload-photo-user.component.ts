import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { UserServiceService } from '@app/services/user/user-service.service';

@Component({
  selector: 'app-upload-photo-user',
  templateUrl: './upload-photo-user.component.html',
  styleUrl: './upload-photo-user.component.css',
  standalone: false,
})
export class UploadPhotoUserComponent implements OnInit {
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  loadImgData: string | null = null;
  name: string = '';
  urlBackend_img_banner_course: string = '';
  maxFileSize = 5 * 1024 * 1024; // 5MB
  allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  errorMessage: string = '';
  base64Data: string = '';

  constructor(
    private apiService: ApiService,
    private userServiceService: UserServiceService
  ) {
    this.urlBackend_img_banner_course =
      this.apiService.API_URL + '/uploads/img/avartaUser/';
  }

  ngOnInit(): void {
    this.getUserAvatar();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Kiểm tra kích thước
      if (file.size > this.maxFileSize) {
        this.errorMessage = 'File quá lớn. Vui lòng chọn file nhỏ hơn 5MB';
        return;
      }

      // Kiểm tra định dạng
      if (!this.allowedTypes.includes(file.type)) {
        this.errorMessage = 'Chỉ chấp nhận file ảnh (JPEG, PNG, GIF)';
        return;
      }

      this.selectedFile = file;
      this.name = file.name;
      this.errorMessage = '';

      // Đọc file thành base64 string
      const reader = new FileReader();
      reader.onload = () => {
        // Lấy chuỗi base64 từ kết quả đọc file
        const base64String = reader.result as string;
        // Loại bỏ phần prefix "data:image/xyz;base64," để lấy chuỗi base64 thuần túy
        this.previewUrl = base64String;
        // Lưu base64 string để gửi lên server
        this.base64Data = base64String.split(',')[1];
      };
      reader.readAsDataURL(file);
    }
  }

  updateUserPicture(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Vui lòng chọn một file ảnh';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.apiService.userServiceService
      .updateUserPicture(this.base64Data)
      .subscribe({
        next: (success: boolean) => {
          if (success) {
            alert('Cập nhật ảnh đại diện thành công!');
          } else {
            this.errorMessage = 'Lỗi khi cập nhật ảnh đại diện';
          }
        },
        error: (error: any) => {
          this.errorMessage = 'Có lỗi xảy ra: ' + error.message;
        },
      });
  }

  getUserAvatar(): void {
    this.apiService.userServiceService.getUserAvatar(this.userServiceService.getUserLogin().id).subscribe({
      next: (avatarUrl: string) => {
        if (avatarUrl) {
          this.loadImgData = avatarUrl;
        } else {
          this.errorMessage = 'Không thể lấy ảnh đại diện';
        }
      },
      error: (error: any) => {
        this.errorMessage =
          'Có lỗi xảy ra khi lấy ảnh đại diện: ' + error.message;
      },
    });
  }
}
