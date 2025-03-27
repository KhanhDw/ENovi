import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
  Input,
  Renderer2, OnChanges, SimpleChanges, ChangeDetectorRef 
} from '@angular/core';
import { WindowRef } from './../../services/window/window-ref.service';
import { BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrl: './youtube-player.component.css',
  standalone: false,
})
export class YoutubePlayerComponent implements OnInit , OnChanges {
  @Input() nameVideo: string = '';
  @Input() titleLesson: string = '';
  @Input() createAtLesson: Date = new Date();
  @ViewChild('player', { static: false }) playerElement!: ElementRef;
  @ViewChild('media') videoElement!: ElementRef<HTMLVideoElement>;
  
  
  videoUrl$ = new BehaviorSubject<string | null>(null);
  titleLesson$ = new BehaviorSubject<string | null>(null);
  createAtLesson$ = new BehaviorSubject<Date | null>(null);

  videoUrl = `https://localhost:3000/stream/video?namevideo=${this.nameVideo}`;


  declare YT: any;
  done = false;
  player: any = null;
  hiddenBanner = false;
  isPlaying = false;
  currentTime: number = 0; // Thời gian hiện tại của video
  videoDuration: number = 0; // Tổng thời lượng video

  showNote = false;

  constructor(
    private zone: NgZone,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private windowRef: WindowRef,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
     
  } 

  ngOnInit(): void {
    // this.initializePlayer();
    // luôn hiển thị banner khi từ nới khác đến
    this.hiddenBanner = false;
    console.warn('nameVideo', this.nameVideo);
    console.warn('videoUrl', this.videoUrl);
  }

  ngAfterViewInit() {
    // this.reiib(); // load data video youtube
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['nameVideo'] && changes['nameVideo'].currentValue) {
      console.log('Dữ liệu cập nhật: thay đổi namevideo', this.nameVideo);
      this.videoUrl$.next(`https://localhost:3000/stream/video?namevideo=${this.nameVideo}`);
      this.nameVideo = changes['nameVideo'].currentValue;
      localStorage.setItem('nameVideo', JSON.stringify(this.nameVideo));
    }
    if (changes['titleLesson'] && changes['titleLesson'].currentValue) {
      console.log('Dữ liệu cập nhật: thay đổi titleLesson', this.titleLesson);
      this.titleLesson$.next(this.titleLesson);
      console.log('this.titleLesson', this.titleLesson);
      this.titleLesson = changes['titleLesson'].currentValue;
      localStorage.setItem('titleLesson', JSON.stringify(this.titleLesson));
    }
    if (changes['createAtLesson'] && changes['createAtLesson'].currentValue) {
      console.log('Dữ liệu cập nhật: thay đổi createAtLesson', this.createAtLesson);
      this.createAtLesson$.next(this.createAtLesson);
      console.log('this.createAtLesson', this.createAtLesson);
      this.createAtLesson = changes['createAtLesson'].currentValue;
      localStorage.setItem('createAtLesson', JSON.stringify(this.createAtLesson));
    }
    this.cdr.detectChanges();  
    // Reset video player if needed
    const videoElement = document.querySelector('video');
    if (videoElement) {
      videoElement.load();
    }
    this.reloadComponent(); // Reload the component
  }

  reloadComponent() {
    this.ngOnDestroy(); // Clean up resources
    this.ngOnInit();    // Reinitialize the component
  }

 //-----------------------------------
  // load youtube player
  //-----------------------------------

  reiib() {
    if (this.windowRef.nativeWindow) {
      // Chỉ truy cập phần tử DOM sau khi view đã khởi tạo
      if ((window as any).YT && (window as any).YT.Player) {
        this.loadPlayer();
      } else {
        (window as any).onYouTubeIframeAPIReady = () => {
          this.loadPlayer();
        };
      }
    }
  }

  private initializePlayer(): void {
    // Kiểm tra và khởi tạo player khi API đã sẵn sàng
    if (typeof this.YT !== 'undefined') {
      this.loadPlayer();
    } else {
      if (this.windowRef.nativeWindow) {
        (window as any).onYouTubeIframeAPIReady = () => {
          this.loadPlayer();
        };
        console.log('hello');
      }
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

  playVideoYoutube() {
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

  // =====================
  // NGX-VIDEOGULAR!
  // =====================

  playlist = [
    {
      title: 'Agent 327!',
      src: './video/video1.mp4',
      type: 'video/mp4',
    },
  ];

  currentIndex = 0;
  activeVideo = this.playlist[this.currentIndex];
  api!: {
    getDefaultMedia: () => {
      (): any;
      new (): any;
      subscriptions: {
        (): any;
        new (): any;
        loadedMetadata: {
          (): any;
          new (): any;
          subscribe: { (arg0: () => void): void; new (): any };
        };
        ended: {
          (): any;
          new (): any;
          subscribe: { (arg0: () => void): void; new (): any };
        };
      };
    };
    play: () => void;
  };

  onPlayerSet(api: any) {
    console.log('API received:', api); // Debugging: Log the received API object
    this.api = api;

    if (this.api && this.api.getDefaultMedia) {
      this.api
        .getDefaultMedia()
        .subscriptions.loadedMetadata.subscribe(this.startVideo.bind(this));
      this.api
        .getDefaultMedia()
        .subscriptions.ended.subscribe(this.nextVideo.bind(this));
    } else {
      console.error('API is not properly initialized or missing methods.');
    }
  }

  nextVideo() {
    this.currentIndex++;

    if (this.currentIndex === this.playlist.length) {
      this.currentIndex = 0;
    }

    this.activeVideo = this.playlist[this.currentIndex];
  }

  // hàm này có vấn đề ?? cần fix sau
  startVideo() {
    if (this.api && this.api.play) {
      this.api.play();
    } else {
      console.error('API is undefined or play method is missing.');
    }
  }



  
  onClickPlaylistVideo(
    item: { title: string; src: string; type: string },
    index: number
  ) {
    this.currentIndex = index;
    this.activeVideo = item;
  }

  hiddenBannerVideoAndPlayVideo() {
    this.hiddenBanner = true;
    if (this.videoElement && this.videoElement.nativeElement) {
      this.videoElement.nativeElement.play();
    }
  }
}
