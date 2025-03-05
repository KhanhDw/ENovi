import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
  Input,
  Renderer2,
} from '@angular/core';

import { WindowRef } from './../../services/window/window-ref.service';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrl: './youtube-player.component.css',
  standalone: false,
})
export class YoutubePlayerComponent implements OnInit {
  constructor(
    private zone: NgZone,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private windowRef: WindowRef
  ) {} // Thêm `NgZone` vào constructor

  @Input() titleCourse: string = '';

  declare YT: any;
  done = false;
  player: any = null;
  hiddenBanner = false;
  isPlaying = false;
  showNote = false;

  currentTime: number = 0; // Thời gian hiện tại của video
  videoDuration: number = 0; // Tổng thời lượng video

  ngOnInit(): void {
    // Kiểm tra và khởi tạo player khi API đã sẵn sàng
    if (typeof this.YT !== 'undefined') {
      this.loadPlayer();
    } else {
      if (this.windowRef.nativeWindow) {
        (window as any).onYouTubeIframeAPIReady = () => {
          this.loadPlayer();
        };
        console.log("hello");
      }
    }

    // luôn hiển thị banner khi từ nới khác đến
    this.hiddenBanner = false;
  }

  @ViewChild('player', { static: false }) playerElement!: ElementRef;

  ngAfterViewInit() {
    if (this.windowRef.nativeWindow){
    // Chỉ truy cập phần tử DOM sau khi view đã khởi tạo
    if ((window as any).YT && (window as any).YT.Player) {
      this.loadPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = () => {
        this.loadPlayer();
      };
    }}
  }

  //-----------------------------------

  //-----------------------------------

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
          disablekb: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event: any) => {
            this.onPlayerReady(event);
          },
          onStateChange: (event: any) => this.onPlayerStateChange(event),
        },
      }
    );
  }

  onPlayerReady(event: any) {
    // event.target.playVideo(); // Bắt đầu phát video khi sẵn sàng
    this.videoDuration = event.target.getDuration(); // Lấy tổng thời lượng video
    this.updateCurrentTime(); // Bắt đầu cập nhật thời gian hiện tại
  }

  onPlayerStateChange(event: any) {
    if (event.data === (window as any).YT.PlayerState.PLAYING && !this.done) {
      this.updateCurrentTime();
      this.done = true;
      this.isPlaying = true; // Cập nhật biến trạng thái
    } else if (
      event.data === (window as any).YT.PlayerState.PAUSED ||
      event.data === (window as any).YT.PlayerState.ENDED ||
      event.data === (window as any).YT.PlayerState.UNSTARTED
    ) {
      this.isPlaying = false; // Cập nhật biến trạng thái
    }
  }

  playVideo() {
    if (this.player) {
      this.player.playVideo();
      this.hiddenBanner = true;
    }
  }

  pauseVideo() {
    if (this.player) {
      this.player.pauseVideo();
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
          this.currentTime = this.player.getCurrentTime(); // Thông báo Angular
        });
      }
    }, 1000);
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

  // ===================
  // Note
  // ===================

  toggleNote() {
    this.showNote = !this.showNote;
  }

  // =====================
  // giải phóng tài nguyên
  // =====================
  ngOnDestroy() {
    if (this.player) {
      this.player.destroy(); // Quan trọng:  Giải phóng tài nguyên khi component bị hủy
    }
  }
}
