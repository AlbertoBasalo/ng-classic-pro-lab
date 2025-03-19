import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Asset } from 'src/app/domain/asset.type';
import { Category } from 'src/app/domain/category.type';
import { Symbol } from 'src/app/domain/symbol.type';

@Component({
  selector: 'lab-new-asset-form',
  templateUrl: './new-asset-form.component.html',
  styleUrls: ['./new-asset-form.component.css'],
})
export class NewAssetFormComponent implements OnInit {
  @Input() public categories: Category[] = [];
  @Input() public symbols: Symbol[] = [];
  @Output() public save: EventEmitter<Asset> = new EventEmitter();

  protected categorySymbols: Symbol[] = [];

  protected form: FormGroup = this.fb.group({
    categoryId: [0, [Validators.required]],
    symbol: ['', [Validators.required]],
    name: ['', [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(0)]],
    value: [1, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form.get('categoryId')?.valueChanges.subscribe((categoryId) => {
      const numericCategoryId = Number(categoryId);
      this.categorySymbols = [...this.symbols.filter((symbol) => symbol.categoryId === numericCategoryId)];
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const asset: Asset = {
        ...formValue,
        categoryId: Number(formValue.categoryId)
      };
      this.save.emit(asset);
    }
  }
}
