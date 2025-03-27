import { Course } from './../../interface/course';
import { Section } from './../../interface/section';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  NgZone,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { LectureService } from '@app/services/lecture/lecture.service';

interface NoteItemSaved {
  id: number;
  titleLecture: string;
  valueNote: string;
  urlLecture: string;
  titleSection: string;
  duration: number;
}

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrl: './lecture.component.css',
  standalone: false,
})
export class LectureComponent implements AfterViewInit, OnInit {
  idCourse: number = -1;
  titleCourse: string = '';
  nameLecture: string = '';
  sumLesson: any; //not use
  listLecture: any;
  progress: number = 10;
  numberLectureFinish: number = 2;
  totalNumberLectureFinish: number = 142;
  isShowLayoutSection = false;
  sectionIdClicked: number = -1;
  saveLectureId: number = -1;

  createAtLesson:Date = new Date();
  

  nameVideo: string = '';

  nameVideo$ = new BehaviorSubject<string | null>(null);
  nameLecture$ = new BehaviorSubject<string | null>(null);
  createAtLesson$ = new BehaviorSubject<Date | null>(null);

  saveDataFirstFetch: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef,
    private lectureService: LectureService
  ) {}

  ngOnInit(): void {
    const rawId = Number(this.route.snapshot.paramMap.get('id')) || -1;
    const rawTitle = this.route.snapshot.paramMap.get('title') || '';

    this.idCourse = rawId;

    this.route.params.subscribe((params) => {
      const idSection = params['idSection'];
      this.nameLecture = params['nameLecture'] || '';
    });

    this.titleCourse = decodeURIComponent(rawTitle);

    console.log('rawId: ', rawId);

    this.getSectionFetch(rawId);

    console.log(
      'this.totalNumberLectureFinish: ',
      this.totalNumberLectureFinish
    );

    window.addEventListener('beforeunload', this.preventPageReload);
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.preventPageReload);
  }

  preventPageReload(event: BeforeUnloadEvent): void {
    event.preventDefault();
    event.returnValue = ''; // Silently block all reload attempts
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
      event.preventDefault(); // Silently block reload via keyboard
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: BeforeUnloadEvent): void {
    event.preventDefault();
    event.returnValue = ''; // Silently block reload via browser actions
  }

  // ==================
  // progress course
  // ==================

  toggleSection() {
    this.isShowLayoutSection = !this.isShowLayoutSection;
  }

  // ==================
  // section of course
  // ==================
  linkTaiBaiTap = '#';
  sections: Section[] = [
    {
      id: 1,
      title: 'tổng quan 1',
      duration: 1,
      finish: true,
      isExpanded: false,
      homework: true,
    },
    {
      id: 2,
      title: 'tổng quan 2',
      duration: 1,
      finish: false,
      isExpanded: false,
      homework: true,
    },
    {
      id: 3,
      title: 'tổng quan 1',
      duration: 1,
      finish: true,
      isExpanded: false,
      homework: true,
    },
    {
      id: 4,
      title: 'tổng quan 2',
      duration: 1,
      finish: false,
      isExpanded: false,
      homework: true,
    },
    {
      id: 5,
      title: 'tổng quan 1',
      duration: 1,
      finish: true,
      isExpanded: false,
      homework: true,
    },
    {
      id: 6,
      title: 'tổng quan 2',
      duration: 1,
      finish: false,
      isExpanded: false,
      homework: true,
    },
    {
      id: 7,
      title: 'tổng quan 1',
      duration: 1,
      finish: true,
      isExpanded: false,
      homework: true,
    },
    {
      id: 8,
      title: 'tổng quan 2',
      duration: 1,
      finish: false,
      isExpanded: false,
      homework: true,
    },
    {
      id: 9,
      title: 'tổng quan 1',
      duration: 1,
      finish: true,
      isExpanded: false,
      homework: true,
    },
  ];

  isShowSectionItem: boolean = false;

  collapseSectionItem(): void {
    this.sections = this.sections.map((section) => ({
      ...section,
      isExpanded: false,
    }));
  }

  toggleSectionItem(sectionId: number): void {
    this.sections = this.sections.map((section) => ({
      ...section,
      isExpanded: section.id === sectionId ? !section.isExpanded : false,
    }));
  }

  // =================
  // note
  // =================

  isShowNoteScreen = false;

  ishowEditNote = false;

  @ViewChild('textAreaEditNote', { static: false })
  textAreaEditNoteElement!: ElementRef;

  ngAfterViewInit(): void {}

  toggleShowEditNote() {
    if (this.textAreaEditNoteElement !== undefined) {
      this.textAreaEditNoteElement.nativeElement.value =
        this.myNotes[0].valueNote;
    }

    this.ishowEditNote = !this.ishowEditNote;
  }

  toggleShowNoteScreen() {
    this.isShowNoteScreen = !this.isShowNoteScreen;
  }

  // ==================
  // note saved
  // ==================
  myNotes: NoteItemSaved[] = [
    {
      id: 1,
      titleLecture: 'Bài giảng mới 1',
      duration: 1,
      valueNote: 'Ghi chú bài giảng mới...',
      urlLecture: '#',
      titleSection: 'title section',
    },
  ];

  newNote: NoteItemSaved = {
    id: 4,
    titleLecture: 'Bài giảng mới',
    duration: 1,
    valueNote: 'Ghi chú bài giảng mới...',
    urlLecture: '#',
    titleSection: 'title section',
  };

  AddNote() {
    //thêm tham số để truyền khi qua backend)
    this.myNotes.push(this.newNote);
  }

  navigateToMyLearning(): void {
    // Logic to navigate back to the payment confirmation page
    window.location.href = '/my-learning';
  }

  // ==================
  // progress Course
  // ==================

  getALlLectureWillLearn() {}

  getSectionFetch(courseId: number) {
    this.apiService.courseInstructorService.getSection(courseId).subscribe({
      next: (res) => {
        if (res.success) {
          this.sections = res.sectionFetch.map((section: any) => ({
            ...section,
            isExpanded: false,
          }));

          this.totalNumberLectureFinish = res.sumLesson[0]?.sumLesson ?? 0;

          // Kiểm tra dữ liệu có tồn tại trước khi gọi hàm tiếp theo
          if (this.sections.length > 0) {
            this.getListLectureOfSection(this.sections[0]?.id);
          }

          this.cdRef.detectChanges();
        }
      },
      error: (err) => {
        console.log('lỗi getSectionFetch http response: ');
      },
    });
  }

  getListLectureOfSection(sectionID: number) {
    this.sectionIdClicked = sectionID;
    this.apiService.courseInstructorService
      .getLessionBySectionId(sectionID, this.idCourse)
      .subscribe({
        next: (res) => {
          if (res?.success) {
            this.listLecture = res.lessionList || [];
            console.log('res.lessionList: ' + this.listLecture.length);

            // Skip if localStorageData already contains data
            if (
              this.saveDataFirstFetch===false &&
              this.listLecture.length > 0 &&
              this.sections.length > 0
            ) {
              console.log(
                `11111sectionID: ${sectionID}, lectureID: ${this.listLecture[0]?.id}`
              );
              this.nameLecture$.next(this.listLecture[0]?.name);
              this.watchLecture(this.sections[0]?.id, this.listLecture[0]?.id);
             
            }

            this.cdRef.detectChanges();
          }
        },
        error: (err) => {
          console.log('lỗi getListLectureOfSection http response: ');
        },
      });
  }

  handleSectionClick(section: any): void {
    this.getListLectureOfSection(section);
  }

  // ==================
  // lecture
  // ==================

  watchLecture(SectionId: number, lectureId: number) {

    this.saveLectureId = lectureId;

    this.lectureService
      .watchLecture(SectionId, lectureId, this.idCourse)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.nameVideo = res.lesson[0]?.nameFileVideo;
            this.nameVideo$.next(this.nameVideo); // Notify changes

            console.log('this.nameVideo: 11', this.nameVideo);
           
            this.nameLecture = res.lesson[0]?.title;
            this.nameLecture$.next(res.lesson[0]?.title); // Notify changes

            this.createAtLesson = res.lesson[0]?.createdAt;
            this.createAtLesson$.next(this.createAtLesson); // Notify changes
           
            this.saveDataFirstFetch=true;
          } else {
            console.log('Error retrieving lesson: ', res.message);
          }
        },
        error: (err) => {
          console.log('Error in watchLecture HTTP response: ', err);
        },
      });
  }


  // ========================
  // next và previous lesson
  // ========================

  nextLesson() {
    const currentIndex = this.listLecture.findIndex(
      (lecture: any) => lecture.id === this.saveLectureId
    );

    if (currentIndex < this.listLecture.length - 1) {
      // Move to the next lecture in the current section
      this.watchLecture(
        this.sectionIdClicked,
        this.listLecture[currentIndex + 1].id
      );
    } else {
      // If it's the last lecture in the current section, move to the next section
      const currentSectionIndex = this.sections.findIndex(
        (section: any) => section.id === this.sectionIdClicked
      );

      if (currentSectionIndex < this.sections.length - 1) {
        const nextSection = this.sections[currentSectionIndex + 1];
        this.getListLectureOfSection(nextSection.id);

        // Automatically watch the first lecture of the next section
        if (this.listLecture.length > 0) {
          this.watchLecture(nextSection.id, this.listLecture[0]?.id);
        }
      } else {
        console.log('You have completed all sections and lectures.');
      }
    }
  }

}
