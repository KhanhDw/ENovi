import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrl: './youtube-player.component.css',
})
export class YoutubePlayerComponent implements OnInit {
  constructor(private zone: NgZone) {} // Thêm `NgZone` vào constructor

  @Input() titleCourse: string = '';

  declare YT: any;
  done = false;
  player: any = null;

  currentTime: number = 0; // Thời gian hiện tại của video
  videoDuration: number = 0; // Tổng thời lượng video

  ngOnInit(): void {
    // Kiểm tra và khởi tạo player khi API đã sẵn sàng
    if (typeof this.YT !== 'undefined') {
      this.loadPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = () => {
        this.loadPlayer();
      };
    }
  }

  @ViewChild('player', { static: false }) playerElement!: ElementRef;

  ngAfterViewInit(): void {
    // Chỉ truy cập phần tử DOM sau khi view đã khởi tạo
    if ((window as any).YT && (window as any).YT.Player) {
      this.loadPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = () => {
        this.loadPlayer();
      };
    }
  }

  loadPlayer() {
    this.player = new (window as any).YT.Player(
      this.playerElement.nativeElement,
      {
        height: '540',
        width: '100%',
        videoId: 'ZiYpigfLQJM',
        playerVars: {
          playsinline: 1,
          controls: 1,
          autoplay: 0,
          rel: 0,
          showinfo: 0,
          autohide: 1,
        },
        events: {
          onReady: (event: any) => this.onPlayerReady(event),
          onPlayerStateChange: (event: any) => this.onPlayerStateChange(event),
        },
      }
    );
  }

  onPlayerReady(event: any) {
    event.target.playVideo(); // Bắt đầu phát video khi sẵn sàng
    this.videoDuration = event.target.getDuration(); // Lấy tổng thời lượng video
    this.updateCurrentTime(); // Bắt đầu cập nhật thời gian hiện tại
  }

  onPlayerStateChange(event: any) {
    if (event.data === (window as any).YT.PlayerState.PLAYING && !this.done) {
      this.updateCurrentTime();
      this.done = true;
    }
  }

  stopVideo() {
    if (this.player) {
      this.player.stopVideo();
    }
  }

  updateCurrentTime() {
    setInterval(() => {
      if (this.player && this.player.getCurrentTime) {
        this.zone.run(() => {
          // this.currentTime = Math.floor(this.player.getCurrentTime()); // Thông báo Angular
          this.currentTime = this.player.getCurrentTime(); // Thông báo Angular
          // console.log(this.currentTime + 'fdsfsdfsdfs');
        });
      }
    }, 1000); // Cập nhật mỗi giây
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  }

  // ===========================
  // tiến đến thời gian chỉ định;
  // ============================
  seekTo(seconds: number): void {
    if (this.player) {
      this.player.seekTo(seconds, true);
    }
  }
}
