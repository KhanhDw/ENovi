import { User } from './../../../interface/user';
import { error } from 'node:console';
import {
  Component,
  HostListener,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { CourseAdmin } from './../../../interface/course';
import { ApiService } from '@app/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrl: './admin-courses.component.css',
  standalone: false,
})
export class AdminCoursesComponent implements OnInit {
  //  truyền data đến component con
  listCourseAdmin: CourseAdmin[] | null = null;

  sortCourses = [
    { name: 'Sắp xếp theo ...', value: '' },
    { name: 'Số lượng học viên giảm dần', value: '' },
    { name: 'Số lượng học viên tăng dần', value: '' },
    { name: 'Doanh thu giảm dần', value: '' },
    { name: 'Doanh thu tăng dần', value: '' },
    { name: 'Thời lượng giảm dần', value: '' },
    { name: 'Thời lượng tăng dần', value: '' },
    // { name: '' },
  ];

  // Biến để kiểm tra xem đã scroll vượt quá 60px hay chưa
  isScrolled = false;
  pointShowHeader = 60;
  showDetailInfo = false;
  listORCard = false;
  gotoDetail = '/admin/courses/detail';
  ShowModalsubmitDeleteCourse = false;

  listCourseAdmin$ = new BehaviorSubject<CourseAdmin[]>([]);

  search:string = '';
  checksearch:boolean  = false

  constructor(private apiService: ApiService, private http: HttpClient) {}
  ngOnInit() {
    this.getAllCourse();
  }

  toggleShowModalsubmitDeleteCourse() {
    this.ShowModalsubmitDeleteCourse = !this.ShowModalsubmitDeleteCourse;
  }

  toggleToList() {
    this.listORCard = false;
  }
  toggleToCart() {
    this.listORCard = true;
  }

  // khởi tạo biến với kiểu dữ liệu là một interface với dữ liệu rỗng ban đầu
  CourseDetailRecive: Partial<CourseAdmin> = {};

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  ngAfterViewInit() {
    this.onScroll();
  }

  onScroll() {
    const scrollTop = this.scrollContainer.nativeElement.scrollTop;
    // console.log('Scroll Top:', scrollTop);
    this.isScrolled = scrollTop > this.pointShowHeader;
  }

  toggleShowDetailInfo() {
    this.showDetailInfo = !this.showDetailInfo;
    if (this.showDetailInfo === false) {
      this.CourseDetailRecive = {};
    }
  }

  handleCourseClick(course: CourseAdmin) {
    const validCourse = course as CourseAdmin; // Ép kiểu về Course
    console.log('Received in Parent:', validCourse);
    console.log(course.instructorId);
    this.getNameInstructor(course.instructorId)
    this.CourseDetailRecive = {};
    this.CourseDetailRecive = course;
    this.showDetailInfo = true;
    console.log('Clicked Item in parent:', course); // Log trong component con
  }

  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    if (this.showDetailInfo) {
      this.showDetailInfo = false;
    }
  }

  getAllCourse() {
    this.apiService.adminCourseService.getAllCourse().subscribe({
      next: (res) => {
        if (res.succese) {
          console.log('thanfh cogn');
          this.listCourseAdmin = res.courses;
          this.listCourseAdmin$.next(res.courses);
          console.log('00000: ' + res.courses);
        }
      },
      error: (error) => {
        console.warn('admin course http reponse');
      },
    });
  }

  getNameInstructor(instructorId:number){
    this.apiService.adminCourseService.getNameInstructor(instructorId).subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.user[0].username);
          this.CourseDetailRecive.instructorName = res.user[0].username;
          this.CourseDetailRecive.img = res.user[0].img;
        }
      },
      error: (error) => {
        console.warn('admin course http reponse');
      },
    });
  }


  onSearch() {
    this.checksearch = true;
    this.apiService.adminCourseService.getCourseByName(this.search).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('laays thanh cong');
          this.listCourseAdmin$.next(res.course);
        }
      },
      error: (error) => {
        console.warn('admin course http reponse');
      },
    });
  }

  huySearch(){
    if (this.search !== '' && this.checksearch === true){
        this.getAllCourse();
        this.search = '';
    }
  }
}
