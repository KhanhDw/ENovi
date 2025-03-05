import { Section } from './../../interface/section';
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  NgZone,
} from '@angular/core';

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
export class LectureComponent implements AfterViewInit {
  // ==================
  // progress course
  // ==================
  progress: number = 10;

  numberLectureFinish: number = 2;
  totalNumberLectureFinish: number = 142;

  isShowLayoutSection = false;

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
      duration:1,
      finish: true,
      isExpanded: false,
      homework: true,
    },
    {
      id: 2,
      title: 'tổng quan 2',
      duration:1,
      finish: false,
      isExpanded: false,
      homework: true,
    },
    {
      id: 3,
      title: 'tổng quan 1',
      duration:1,
      finish: true,
      isExpanded: false,
      homework: true,
    },
    {
      id: 4,
      title: 'tổng quan 2',
      duration:1,
      finish: false,
      isExpanded: false,
      homework: true,
    },
    {
      id: 5,
      title: 'tổng quan 1',
      duration:1,
      finish: true,
      isExpanded: false,
      homework: true,
    },
    {
      id: 6,
      title: 'tổng quan 2',
      duration:1,
      finish: false,
      isExpanded: false,
      homework: true,
    },
    {
      id: 7,
      title: 'tổng quan 1',
      duration:1,
      finish: true,
      isExpanded: false,
      homework: true,
    },
    {
      id: 8,
      title: 'tổng quan 2',
      duration:1,
      finish: false,
      isExpanded: false,
      homework: true,
    },
    {
      id: 9,
      title: 'tổng quan 1',
      duration:1,
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
    this.sections = this.sections.map((section) => {
      if (section.id === sectionId) {
        return {
          // đây là cách 1
          // id: section.id,
          // title: section.title,
          // duration: section.duration,
          // finish: section.finish,

          // đây là cách 2: lấy hết các thuộc tính tránh sai sót khi thiếu
          ...section,
          isExpanded: !section.isExpanded,
        };
      } else {
        return section;
      }
    });
  }

  titleCourse: string =
    'Tổng quan về lập trình Tổng quan về lập trình Tổng quan về lập trình Tổng quan về lập trình';

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
}
