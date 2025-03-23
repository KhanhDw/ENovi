import { error } from 'node:console';
import {
  Component,
  OnChanges,
  Input,
  OnInit,
  AfterViewInit,
  SimpleChanges,
} from '@angular/core';
import { UserAdmin } from '@app/interface/user';
import { Observable } from 'rxjs';
import { ApiService } from '@app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table-data-user-admin',
  templateUrl: './table-data-user-admin.component.html',
  styleUrl: './table-data-user-admin.component.css',
  standalone: false,
})
export class TableDataUserAdminComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Input() data!: Observable<UserAdmin[]>;

  ngOnInit(): void {
    this.data.subscribe((users) => {
      if (users && users.length > 0) {
        // Xử lý users ở đây
        console.log('đã load data thành công');
      }
    });
  }

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {}

  getStatusClass(status: string): string {
    return status === 'In Stock'
      ? 'bg-green-200 text-green-900'
      : 'bg-red-200 text-red-900';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
    }
  }

  deleteUserAdmin(id: number) {
    this.apiService.userServiceService.deleteUser(id).subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.message);
          this.snackBar.open('Xóa người dùng thành công', 'Close', {
            duration: 3000,
          });
          // window.location.reload();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

 
}
