import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategorySymbolVO } from 'src/app/domain/category-symbol-vo.type';
import { SymbolsRepositoryService } from 'src/app/shared/symbols-repository.service';

@Component({
  selector: 'lab-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.css']
})
export class SymbolsComponent {

  protected symbols$: Observable<CategorySymbolVO[]> = of([]);
  constructor(private symbolsRepository: SymbolsRepositoryService) {}

  onSearch(value: string) {
    this.symbols$ = this.symbolsRepository.getSymbolsBySearchTerm$(value);
  }
}
