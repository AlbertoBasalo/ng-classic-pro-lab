import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable, switchMap, tap } from 'rxjs';
import { CategorySymbolVO } from 'src/app/domain/category-symbol-vo.type';
import { SymbolsRepositoryService } from 'src/app/shared/symbols-repository.service';

@Component({
  selector: 'lab-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SymbolsComponent implements OnInit {
  private searchTerm$ = new BehaviorSubject<string>('');
  
  protected symbols$: Observable<CategorySymbolVO[]> = this.searchTerm$.pipe(
    distinctUntilChanged(),
    tap((searchTerm) => this.router.navigate([], { queryParams: { search: searchTerm } })),
    switchMap((searchTerm) => this.symbolsRepository.getSymbolsBySearchTerm$(searchTerm)),
  );

  protected paramSearchTerm = '';

  constructor(
    private symbolsRepository: SymbolsRepositoryService, 
    private router: Router, 
    private route: ActivatedRoute) {
  }
 
  ngOnInit(): void {
    this.route.queryParams.pipe(
      map((params) => params['search'] || ''),
      filter((searchTerm) => searchTerm !== ''),
      tap((searchTerm) => this.paramSearchTerm = searchTerm ),
      tap((searchTerm) => this.searchTerm$.next(searchTerm))
    ).subscribe();
  }

  onSearch(value: string) {
    this.searchTerm$.next(value);
  }
}
