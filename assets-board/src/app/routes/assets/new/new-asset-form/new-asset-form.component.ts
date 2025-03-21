import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { Asset, NULL_ASSET } from 'src/app/domain/asset.type';
import { CategorySymbolVO } from 'src/app/domain/category-symbol-vo.type';
import { Category } from 'src/app/domain/category.type';
import { AssetsStoreService } from 'src/app/shared/assets/assets-store.service';

@Component({
  selector: 'lab-new-asset-form',
  templateUrl: './new-asset-form.component.html',
  styleUrls: ['./new-asset-form.component.css'],
})
export class NewAssetFormComponent implements OnInit {
  @Input() public categories: Category[] = [];
  @Input() public symbols: CategorySymbolVO[] = [];
  @Output() public save: EventEmitter<Asset> = new EventEmitter();

  protected categorySymbols: CategorySymbolVO[] = [];
  protected existingAsset: Asset | null = null;
  protected isRealEstate = false;

  protected form: FormGroup = this.fb.group({
    categoryId: [0, [Validators.required]],
    symbol: ['', {
      validators: [Validators.required],
      asyncValidators: [this.symbolValidator()],
      updateOn: 'blur'
    }],
    name: ['', [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(0)]],
    value: [1, [Validators.required, Validators.min(0)]],
  });

  constructor(
    private fb: FormBuilder,
    private assetsStore: AssetsStoreService
  ) {}

  ngOnInit() {
    this.form.get('categoryId')?.valueChanges.subscribe((categoryId) => {
      const numericCategoryId = Number(categoryId);
      this.categorySymbols = [...this.symbols.filter((symbol) => symbol.categoryId === numericCategoryId)];
      this.isRealEstate = numericCategoryId === 2; // Flat/Real Estate category

      // Reset symbol when category changes
      this.form.get('symbol')?.setValue('');
      this.existingAsset = null;
      
      // Handle field behavior based on category
      if (this.isRealEstate) {
        this.form.get('name')?.enable();
        this.form.get('value')?.enable();
      } else {
        this.form.get('name')?.disable();
        this.form.get('value')?.disable();
      }
    });

    this.form.get('symbol')?.valueChanges.subscribe(symbol => {
      if (!this.isRealEstate && symbol) {
        // For non-real estate, look up symbol info and populate fields
        const symbolObj = this.categorySymbols.find(s => s.symbol === symbol);
        if (symbolObj) {
          this.form.get('name')?.setValue(symbolObj.symbol);
          // Value would typically come from an API, using placeholder value for now
          this.form.get('value')?.setValue(1);
        }
      }
    });
  }

  symbolValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const symbol = control.value;
      if (!symbol) {
        control.setErrors(null);
        control.markAsUntouched();
        return of(null);
      }
      return this.assetsStore.selectAssetBySymbol$(symbol).pipe(
        map(asset => {
          if (asset && asset.id) {
            // Store the existing asset for template use
            this.existingAsset = asset;
            control.setErrors({ symbolExists: true });
            control.markAsTouched();
            return { symbolExists: true };
          }
          this.existingAsset = null;
          control.setErrors(null);
          control.markAsDirty();
          return null;
        })
      );
    };
  }

  onSubmit() {
    const formValue = this.form.value;
    const asset: Asset = {
      id:0,
      name: this.form.get('name')?.value,
      categoryId: formValue.categoryId,
      symbol: formValue.symbol,
      quantity: formValue.quantity,
      value: this.form.get('value')?.value
    };
    this.save.emit(asset);
    this.form.reset(NULL_ASSET);
  }
}

/**
 * For any symbol, there should be only one asset
 * - So, we must have an async validator for the symbol field
 * - If the symbol is already in use, the form is marked as invalid
 * - and a link to the edit page is shown
 * 
 * For real state 
 * - allow to set the value and name of the asset
 
* For any other category, 
* - Values and name are not editable, and should come from the API
* 
*/