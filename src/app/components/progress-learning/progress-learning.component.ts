import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-progress-learning',
  templateUrl: './progress-learning.component.html',
  styleUrl: './progress-learning.component.css',
})
export class ProgressLearningComponent implements AfterViewInit {
  private _progress: number = 0; // Giá trị mặc định

  @Input()
  set progress(value: number) {
    this._progress = value;
    this.ProgressF();
  }

  get progress(): number {
    return this._progress;
  }

  @ViewChild('CircularProgress') CircularProgressElement!: ElementRef;

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this.CircularProgressElement) {
      this.ProgressF();
    }
  }

  ProgressF() {
    // Tính toán góc conic-gradient dựa trên progress
    let angle = this.progress * 3.6; // 100% tương ứng với 360 độ
    if (this.CircularProgressElement !== undefined)
      this.CircularProgressElement.nativeElement.style.background = `conic-gradient(#7d2ae8 ${angle}deg, #ededee 0deg)`;
  }
}
