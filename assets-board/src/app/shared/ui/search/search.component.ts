import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, tap } from 'rxjs';

@Component({
  selector: 'lab-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter();

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(300),
        map((event: Event) => {
          const target = event.target as HTMLInputElement;
          return target.value;
        }),
        filter((value: string) => value.length!=1),
        distinctUntilChanged(),
        tap((value: string) => {
          this.search.emit(value);
        })
      )
      .subscribe();
  } 
}
