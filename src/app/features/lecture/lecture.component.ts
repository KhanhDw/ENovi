import { Section } from './../../interface/section';
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  NgZone,
} from '@angular/core';

@Component({
    selector: 'app-lecture',
    templateUrl: './lecture.component.html',
    styleUrl: './lecture.component.css',
    standalone: false
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

  section: Section = {
    id: 1,
    title: 'tổng quan',
    duration: '1:23',
    finish: false,
    isExpanded: false,
  };

  sections: Section[] = [
    {
      id: 1,
      title: 'tổng quan 1',
      duration: '01:23',
      finish: true,
      isExpanded: false,
    },
    {
      id: 2,
      title: 'tổng quan 2',
      duration: '05:43',
      finish: false,
      isExpanded: false,
    },
    {
      id: 3,
      title: 'tổng quan 1',
      duration: '01:23',
      finish: true,
      isExpanded: false,
    },
    {
      id: 4,
      title: 'tổng quan 2',
      duration: '05:43',
      finish: false,
      isExpanded: false,
    },
    {
      id: 5,
      title: 'tổng quan 1',
      duration: '01:23',
      finish: true,
      isExpanded: false,
    },
    {
      id: 6,
      title: 'tổng quan 2',
      duration: '05:43',
      finish: false,
      isExpanded: false,
    },
    {
      id: 7,
      title: 'tổng quan 1',
      duration: '01:23',
      finish: true,
      isExpanded: false,
    },
    {
      id: 8,
      title: 'tổng quan 2',
      duration: '05:43',
      finish: false,
      isExpanded: false,
    },
    {
      id: 9,
      title: 'tổng quan 1',
      duration: '01:23',
      finish: true,
      isExpanded: false,
    },
  ];

  isShowSectionItem: boolean = false;

  toggleSectionItem(sectionId: number): void {
    this.sections = this.sections.map((section) => ({
      ...section,
      isExpanded:
        section.id === sectionId ? !section.isExpanded : section.isExpanded,
    }));
  }

  titleCourse: string =
    'Tổng quan về lập trình Tổng quan về lập trình Tổng quan về lập trình Tổng quan về lập trình';

  // =================
  // note
  // =================

  isShowNoteScreen = false;

  ishowEditNote = false;

  dataTextArea: string = 'nội dung này truyền từ typescript';

  @ViewChild('textAreaEditNote', { static: false })
  textAreaEditNoteElement!: ElementRef;

  ngAfterViewInit(): void {}

  toggleShowEditNote() {
    if (this.textAreaEditNoteElement !== undefined) {
      this.textAreaEditNoteElement.nativeElement.value = this.dataTextArea;
    }

    this.ishowEditNote = !this.ishowEditNote;
  }

  toggleShowNoteScreen() {
    this.isShowNoteScreen = !this.isShowNoteScreen;
  }
}
