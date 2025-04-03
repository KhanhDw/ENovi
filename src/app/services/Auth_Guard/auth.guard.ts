import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserServiceService } from '../user/user-service.service'; // Import UserServiceService

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inject Router để chuyển hướng nếu không đủ quyền
  const userService = inject(UserServiceService); // Inject UserServiceService để sử dụng service
  const userInfo = userService.getUserLogin(); // Lấy thông tin user từ service

  if (userInfo.roleUser === 'admin') {
    return true; // Nếu là admin, cho phép truy cập
  } else {
    router.navigate(['/unauthorized']); // Nếu không phải admin, chuyển hướng
    return false;
  }
};
