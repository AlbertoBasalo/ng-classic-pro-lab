import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Asset } from 'src/app/domain/asset.type';
import { Category } from 'src/app/domain/category.type';
import { Symbol, SymbolCategory } from 'src/app/domain/symbol.type';
import { SymbolsRepositoryService } from 'src/app/shared/symbols-repository.service';

@Component({
  selector: 'lab-new-asset-form',
  templateUrl: './new-asset-form.component.html',
  styleUrls: ['./new-asset-form.component.css'],
})
export class NewAssetFormComponent {
  @Input() public categories: Category[] = [];
  @Output() public save: EventEmitter<Asset> = new EventEmitter();

  protected form: FormGroup = this.fb.group({
    category: ['', [Validators.required]],
    symbol: ['', [Validators.required]],
    name: ['', [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(0)]],
    value: [1, [Validators.required, Validators.min(0)]],
  });

  protected symbols: Symbol[] = [];

  constructor(
    private fb: FormBuilder,
    private symbolsRepository: SymbolsRepositoryService
  ) {
    this.form.get('category')?.valueChanges.subscribe((categoryId) => {
      if (categoryId) {
        this.symbolsRepository
          .getSymbolsByCategory$(categoryId as SymbolCategory)
          .subscribe((symbols) => {
            this.symbols = symbols;
            this.form.patchValue({ symbol: '', name: '' });
          });
      }
    });

    this.form.get('symbol')?.valueChanges.subscribe((symbolName) => {
      if (symbolName) {
        const symbol = this.symbols.find((s) => s.name === symbolName);
        if (symbol) {
          this.form.patchValue({ name: symbol.name });
        }
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }
}
