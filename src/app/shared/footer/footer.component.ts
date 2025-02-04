import { Component } from '@angular/core';
import { link } from 'node:fs';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
    standalone: false
})
export class FooterComponent {
  menuItem = [
    { title: 'Giới thiệu', link: '/about' },
    { title: 'Điều khoản', link: '/terms' },
    { title: 'Chính sách và quyền riêng tư', link: '/privacy' },
    {
      title: 'Tuyên bố về khả năng tiếp cận',
      link: '/accessibility-statement',
    },
  ];
  menuItem1 = [
    { title: 'Bài viết', link: '/blog' },
    { title: 'Sơ đồ trang web', link: '/sitemap' },
    { title: 'Trợ giúp và hỗ trợ', link: '/support' },
    { title: 'Trở thành giảng viên trên ENovi', link: '/lecturer' },
  ];

  menuSocial = [
    { tile: 'bi-linkedin', link: 'https://vn.linkedin.com/' },
    { tile: 'bi-facebook', link: 'https://www.facebook.com/' },
    { tile: 'bi-twitter-x', link: 'https://x.com/' },
    { tile: 'bi-instagram', link: 'https://www.instagram.com/' },
    { tile: 'bi-threads', link: 'https://www.threads.net/?hl=en' },
  ];
}
