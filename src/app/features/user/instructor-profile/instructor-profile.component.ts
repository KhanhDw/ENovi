import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { UserServiceService } from '@app/services/user/user-service.service';
@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrl: './instructor-profile.component.css',
  standalone: false,
})
export class InstructorProfileComponent implements OnInit {
  // editProfileURL = '/user/instructor/profile/updateInfo/basic-information';
  editProfileURL = '/user/edit-information/basic-information';
  avatarUrl: string = '';
  urlBackend_img_banner_course: string = '';
  instructor = {
    name: 'NULL',
    stats: {
      totalStudents: 107223,
      totalCourses: 11914111,
      reviews: 11914,
    },
    website: 'NULL',
    bio: `Mark Lassoff 's parents frequently claim that Mark was born to be a programmer. Starting, in the mid-eighties at age 11, Mark was hard at work on his Commodore 64 writing games in the BASIC language. After completing a computer science degree, Mark developed software for several well-known internet startups during the initial internet boom of the mid 1990's. Five years ago Mark parlayed a two decades of software development experience into his latest entrepreneurial venture, LearnToProgram Media.

    LearnToProgram. Mark Lassoff 's parents frequently claim that Mark was born to be a programmer. Starting, in the mid-eighties at age 11, Mark was hard at work on his Commodore 64 writing games in the BASIC language. After completing a computer science degree, Mark developed software for several well-known internet startups during the initial internet boom of the mid 1990's. Five years ago Mark parlayed a two decades of software development experience into his latest entrepreneurial venture, LearnToProgram Media.

    LearnToProgram. Media publishes online courses that teach mobile, web, and game development. Over 500,000 people have learned programming from Mark through online classes he has either authored or published. In addition to publishing popular courses and books LearnToProgram Media operates an internet video network which produces several programs on software development.
    
    Previously Mark founded PowerPlant Marketing, which created marketing automation software for REALTORS™. After the sale of PowerPlant, Mark went on to found Internet Broadcasting Group which counted among it's launch clients Nike, Blue Moon Brewing Company and Opubco.
    
    Mark lives in Connecticut and speaks worldwide on software development, entrepreneurship and online learning. He has spoken at TechWeek NY, TechWeek LA, and SXSW, among other large conferences. In his spare time he he enjoys aviation, mentoring new business owners and spending time with life-long friends and family.`,
    socialLinks: [
      {
        name: 'Website.com.vn.long.io.kha.sdds.huloisadsad.ds',
        icon: 'link',
        url: '#',
      },
      // { name: 'X', icon: 'twitter', url: '#' },
      // { name: 'Facebook', icon: 'facebook', url: '#' },
      // { name: 'LinkedIn', icon: 'linkedin', url: '#' },
      // { name: 'Youtube', icon: 'youtube', url: '#' },
    ],
  };

  constructor(
    private apiService: ApiService,
    private userServiceService: UserServiceService
  ) {
    this.urlBackend_img_banner_course =
      this.apiService.API_URL + '/uploads/img/avartaUser/';
  }

  ngOnInit(): void {
    this.getUserAvatar();
    this.instructor.name = this.userServiceService.getUserLogin().name || 'NULL';
    this.getTotalStudents();
    this.instructor.socialLinks[0].name = this.userServiceService.getUserLogin().website || 'NULL';
    this.instructor.socialLinks[0].url = this.userServiceService.getUserLogin().website || 'NULL';
    this.instructor.bio = this.userServiceService.getUserLogin().biography || 'NULL';
  }

  getUserAvatar(): void {

    this.apiService.userServiceService
      .getUserAvatar(this.userServiceService.getUserLogin().id)
      .subscribe({
        next: (avatarUrl: string) => {
          this.avatarUrl = avatarUrl;
        },
      });
  }


  getTotalStudents(): void {
    this.apiService.courseInstructorService.getTotalCourses(this.userServiceService.getUserLogin().id).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.instructor.stats.totalCourses = response.totalCourses;
        } else {
          console.error('Lỗi:', response.message);
        }
      },
      error: (error) => {
        console.error('Lỗi khi lấy số lượng khóa học: // HttpErrorResponse',);
      }
    });
  }

  
  getUserId(): { id: number; roleUser: string; name: string; picture?: string; email?: string, website?: string, biography?: string } {
    return this.userServiceService.getUserLogin();
  }


}
