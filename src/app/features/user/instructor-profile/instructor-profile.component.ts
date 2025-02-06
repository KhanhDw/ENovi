import { Component } from '@angular/core';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrl: './instructor-profile.component.css',
})
export class InstructorProfileComponent {
  instructor = {
    name: 'Mark Lassoff',
    title: 'Programming Instructor with over 500,000 students worldwide.',
    stats: {
      totalStudents: '107,223',
      reviews: '11,914',
    },
    bio: `Mark Lassoff 's parents frequently claim that Mark was born to be a programmer. Starting, in the mid-eighties at age 11, Mark was hard at work on his Commodore 64 writing games in the BASIC language. After completing a computer science degree, Mark developed software for several well-known internet startups during the initial internet boom of the mid 1990's. Five years ago Mark parlayed a two decades of software development experience into his latest entrepreneurial venture, LearnToProgram Media.

    LearnToProgram Media publishes online courses that teach mobile, web, and game development. Over 500,000 people have learned programming from Mark through online classes he has either authored or published. In addition to publishing popular courses and books LearnToProgram Media operates an internet video network which produces several programs on software development.
    
    Previously Mark founded PowerPlant Marketing, which created marketing automation software for REALTORS™. After the sale of PowerPlant, Mark went on to found Internet Broadcasting Group which counted among it's launch clients Nike, Blue Moon Brewing Company and Opubco.
    
    Mark lives in Connecticut and speaks worldwide on software development, entrepreneurship and online learning. He has spoken at TechWeek NY, TechWeek LA, and SXSW, among other large conferences. In his spare time he he enjoys aviation, mentoring new business owners and spending time with life-long friends and family.`,
    socialLinks: [
      { name: 'Website', icon: 'link', url: '#' },
      { name: 'X', icon: 'twitter', url: '#' },
      { name: 'Facebook', icon: 'facebook', url: '#' },
      { name: 'LinkedIn', icon: 'linkedin', url: '#' },
      { name: 'Youtube', icon: 'youtube', url: '#' },
    ],
  };
}
