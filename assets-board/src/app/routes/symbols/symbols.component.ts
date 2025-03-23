import { Component } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { CategorySymbolVO } from 'src/app/domain/category-symbol-vo.type';
import { SymbolsRepositoryService } from 'src/app/shared/symbols-repository.service';

@Component({
  selector: 'lab-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.css']
})
export class SymbolsComponent {
  private searchTerm$ = new BehaviorSubject<string>('');

  protected symbols$: Observable<CategorySymbolVO[]> = this.searchTerm$.pipe(
    switchMap((searchTerm) => this.symbolsRepository.getSymbolsBySearchTerm$(searchTerm))
  );

  constructor(private symbolsRepository: SymbolsRepositoryService) {}

  onSearch(value: string) {
    this.searchTerm$.next(value);
  }

 
}
