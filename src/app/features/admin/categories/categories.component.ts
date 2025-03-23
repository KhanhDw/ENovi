import { ApiService } from '@app/services/api.service';
import { error } from 'node:console';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoriesServiceService } from '@app/services/category/categories-service.service';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  @ViewChild('categoryInput') categoryInput!: ElementRef;
  @ViewChild('categoryv1Input') categoryv1Input!: ElementRef;
  @ViewChild('categoryv2Input') categoryv2Input!: ElementRef;

  linhvuc = [{ id: 1, name: 'Lập trình' }];
  chuyennganh: { id: number; name: string }[] = []; //[{id: 1, name: 'Lập trình', categories_id: 1 }];
  phanmuc: { id: number; name: string }[] = []; //[{id: 1, name: 'Lập trình' , categoriesV1_id: 1}];

  inputLinhVuc: string = '';
  inputChuyenNganh: string = '';
  inputPhanMuc: string = '';

  idLinhVuc: number = 0;
  idChuyenNganh: number = 0;

  messageChuyenNganh: string = '';
  messagePhanMuc: string = '';

  constructor(
    private categoriesServiceService: CategoriesServiceService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getcategory();
  }

  getcategory() {
    this.categoriesServiceService.GetCategoryAPI().subscribe({
      next: (res) => {
        if (res.success) {
          this.linhvuc = res.categories;
        }
      },
      error: (error) => {},
    });
  }

  getV1category(id: number) {
    this.idLinhVuc = id;
    this.categoriesServiceService.GetCategoryAPIV1(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.chuyennganh = res.categoriesV1;
          this.phanmuc = [];
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getV2category(id: number) {
    this.idChuyenNganh = id;
    this.categoriesServiceService.GetCategoryAPIV2(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.phanmuc = res.categoriesV2;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createNewLinhVuc(name: string) {
    if (!name || name.trim() === '') {
      this.categoryv1Input.nativeElement.focus(); // Focus vào ô nhập
      return;
    }

    this.apiService.adminCategoryService
      .createNewLinhVuc(name.trim())
      .subscribe({
        next: (res) => {
          if (res.success) {
            console.log('create success category');
            this.getcategory();
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  createNewChuyenNganh(name: string) {
    if (!name || name.trim() === '') {
      this.categoryv1Input.nativeElement.focus(); // Focus vào ô nhập
      return;
    }

    if (this.idLinhVuc === 0) {
      this.messageChuyenNganh =
        'vui lòng chọn 1 lĩnh vực cần thêm chuyên ngành';
      return;
    }

    this.apiService.adminCategoryService
      .createNewChuyenNganh(name.trim(), this.idLinhVuc)
      .subscribe({
        next: (res) => {
          if (res.success) {
            console.log('create success category');
            this.messageChuyenNganh = '';
            this.getV1category(this.idLinhVuc);
          }
        },
        error: (error) => {
          console.log(error);
          this.messageChuyenNganh = 'Lỗi khởi tạo category';
        },
      });
  }
  createNewPhanMuc(name: string) {
    if (!name || name.trim() === '') {
      this.categoryv2Input.nativeElement.focus(); // Focus vào ô nhập
      return;
    }

    if (this.idChuyenNganh === 0) {
      this.messagePhanMuc =
        'vui lòng chọn 1 chuyên ngành cần thêm chuyên ngành';
      return;
    }

    this.apiService.adminCategoryService
      .createNewPhanMuc(name.trim(), this.idChuyenNganh)
      .subscribe({
        next: (res) => {
          if (res.success) {
            console.log('create success category');
            this.messagePhanMuc = '';
            this.getV2category(this.idChuyenNganh);
          }
        },
        error: (error) => {
          console.log(error);
          this.messagePhanMuc = 'Lỗi khởi tạo';
        },
      });
  }

  //===============================
  deleteNewLinhVuc(id: number) {
    this.apiService.adminCategoryService.deleteLinhVuc(id).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('create success category');
          this.getcategory();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  deleteNewChuyenNganh(id: number) {
    if (this.idLinhVuc === 0) {
      this.messageChuyenNganh =
        'vui lòng chọn 1 lĩnh vực cần thêm chuyên ngành';
      return;
    }

    this.apiService.adminCategoryService.deleteChuyenNganh(id).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('create success category');
          this.messageChuyenNganh = '';
          this.getV1category(this.idLinhVuc);
        }
      },
      error: (error) => {
        console.log(error);
        this.messageChuyenNganh = 'Lỗi khởi tạo category';
      },
    });
  }


  
  deleteNewPhanMuc(id: number) {
    if (this.idChuyenNganh === 0) {
      this.messagePhanMuc =
        'vui lòng chọn 1 chuyên ngành cần thêm chuyên ngành';
      return;
    }

    this.apiService.adminCategoryService.deletePhanMuc(id).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('delete success phan muc');
          this.messagePhanMuc = '';
          this.getV2category(this.idChuyenNganh);
        }
      },
      error: (error) => {
        console.log(error);
        this.messagePhanMuc = 'Lỗi khởi tạo';
      },
    });
  }
}
