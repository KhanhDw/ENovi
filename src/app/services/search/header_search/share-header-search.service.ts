import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareHeaderSearchService {
  constructor() {}

  private searchResultService = new BehaviorSubject<any>('');

  private searchTermSourceTitle = new BehaviorSubject<any>('');
  private searchTermSourceRating = new BehaviorSubject<any>('');
  private searchTermSourcePrice = new BehaviorSubject<any>('');
  private searchTermSourceDuration = new BehaviorSubject<any>('');
  private searchTermSourceLanguage = new BehaviorSubject<any>('');
  private searchTermSourceLevel = new BehaviorSubject<any>('');
  private searchTermSourcePage = new BehaviorSubject<any>('');
  private searchTermSourceTotalItem = new BehaviorSubject<any>('');
  private searchTermSourceSort = new BehaviorSubject<any>('');

  currentSearchResultService = this.searchResultService.asObservable();

  currentSearchTermTitle = this.searchTermSourceTitle.asObservable();
  currentSearchTermRating = this.searchTermSourceRating.asObservable();
  currentSearchTermPrice = this.searchTermSourcePrice.asObservable();
  currentSearchTermDuration = this.searchTermSourceDuration.asObservable();
  currentSearchTermLanguage = this.searchTermSourceLanguage.asObservable();
  currentSearchTermLevel = this.searchTermSourceLevel.asObservable();
  currentSearchTermPage = this.searchTermSourcePage.asObservable();
  currentSearchTermTotalItem = this.searchTermSourceTotalItem.asObservable();
  currentSearchTermSort = this.searchTermSourceSort.asObservable();

  updateSearchTerm(
    Title: any,
    Rating: any,
    Price: any,
    Duration: any,
    Language: any,
    Level: any,
    resultSearch: any,
    page: any,
    totalItem: number,
    sort: string
  ) {
    this.searchTermSourceTitle.next(Title);
    this.searchTermSourceRating.next(Rating);
    this.searchTermSourcePrice.next(Price);
    this.searchTermSourceDuration.next(Duration);
    this.searchTermSourceLanguage.next(Language);
    this.searchTermSourceLevel.next(Level);
    this.searchTermSourcePage.next(page);
    this.searchTermSourceTotalItem.next(totalItem);
    this.searchTermSourceSort.next(sort);

    this.searchResultService.next(resultSearch);
    // console.log('resultSearch:' + resultSearch);
  }

  clearSearchData() {
    this.searchTermSourceTitle.next('');
    this.searchTermSourceRating.next('');
    this.searchTermSourcePrice.next('');
    this.searchTermSourceDuration.next('');
    this.searchTermSourceLanguage.next('');
    this.searchTermSourceLevel.next('');
    this.searchTermSourcePage.next('');
    this.searchTermSourceTotalItem.next('');
    this.searchTermSourceSort.next('');
    this.searchResultService.next('');
  }
}
