import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, map, Observable, switchMap, tap } from 'rxjs';
import { CategorySymbolVO } from 'src/app/domain/category-symbol-vo.type';
import { SymbolsRepositoryService } from 'src/app/shared/symbols-repository.service';

@Component({
  selector: 'lab-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.css']
})
export class SymbolsComponent  {
  private searchTerm$ = new BehaviorSubject<string>('');
  
  protected symbols$: Observable<CategorySymbolVO[]> = this.searchTerm$.pipe(
    distinctUntilChanged(),
    tap((searchTerm) => this.router.navigate(['/symbols', searchTerm])),
    switchMap((searchTerm) => this.symbolsRepository.getSymbolsBySearchTerm$(searchTerm))
  );

  constructor(
    private symbolsRepository: SymbolsRepositoryService, 
    private router: Router, 
    private route: ActivatedRoute) {
    this.route.queryParams.pipe(
      map((params) => params['searchTerm'] || ''),
      tap((searchTerm) => this.searchTerm$.next(searchTerm))
    ).subscribe();
  }
 
  onSearch(value: string) {
    this.searchTerm$.next(value);
  }


}
