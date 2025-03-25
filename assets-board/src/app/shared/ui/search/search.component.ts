import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { debounceTime, filter, fromEvent, map, tap } from 'rxjs';

@Component({
  selector: 'lab-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit {
  @Output() search: EventEmitter<string> = new EventEmitter();
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  
  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'input')
    .pipe(
      debounceTime(300),
      map((event: Event) => (event.target as HTMLInputElement).value),
      filter((value: string) => value.length!=1),
      tap((value: string) => this.search.emit(value))
    )
    .subscribe();
  }
}
