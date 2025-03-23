import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Asset, NULL_ASSET } from 'src/app/domain/asset.type';
import { CategorySymbolVO } from 'src/app/domain/category-symbol-vo.type';
import { Category } from 'src/app/domain/category.type';
import { evenValidator, maxInvestmentValidator, symbolValidator } from 'src/app/shared/asset.vallidators';
import { AssetsStoreService } from 'src/app/shared/assets/assets-store.service';


/**
 * Presentational component with a form to add a new asset
 */
@Component({
  selector: 'lab-new-asset-form',
  templateUrl: './new-asset-form.component.html',
  styleUrls: ['./new-asset-form.component.css'],
})
export class NewAssetFormComponent implements OnInit {
  @Input() public categories: Category[] = [];
  @Input() public categoriesSymbols: CategorySymbolVO[] = [];
  @Output() public save: EventEmitter<Asset> = new EventEmitter();

  protected categorySymbols: CategorySymbolVO[] = [];
  protected existingAssetForSymbol: Asset | null = null;
  protected isRealEstate = false;

  protected form = this.fb.group({
    categoryId: [0, [Validators.required, Validators.min(1)]],
    symbol: ['', {
      validators: [Validators.required],
      asyncValidators: [symbolValidator()],
      updateOn: 'change'
    }],
    name: ['', [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(0), evenValidator]],
    value: [1, [Validators.required, Validators.min(0)]],
  }, {
    validators: [maxInvestmentValidator(1000000)]
  });

  constructor(
    private fb: FormBuilder,
    private assetsStore: AssetsStoreService
  ) {}

  ngOnInit() {
    this.getControl('categoryId').valueChanges
      .subscribe((categoryId) => this.onCategoryChange(categoryId));

    this.getControl('symbol').valueChanges
      .subscribe(symbol => this.onSymbolChange(symbol));
  }

  private onCategoryChange(categoryId: number): void {
    const numericCategoryId = Number(categoryId);
    this.categorySymbols = this.categoriesSymbols.filter(
      (symbol) => symbol.categoryId === numericCategoryId);
    this.isRealEstate = numericCategoryId === 2; // Flat/Real Estate category

    // Reset symbol when category changes
    this.getControl('symbol').setValue('');
    this.existingAssetForSymbol = null;
    
    // Handle field behavior based on category
    if (this.isRealEstate) {
      this.getControl('name').enable();
      this.getControl('value').enable();
    } else {
      this.getControl('name').disable();
      this.getControl('value').disable();
      }
  }
  

  private onSymbolChange(symbol: string): void {
    if (!symbol) return;
    if (this.isRealEstate) return;
    // For non-real estate, look up symbol info and populate fields
    const symbolObj = this.categorySymbols.find(s => s.symbol === symbol);
    if(!symbolObj) return;
    this.getControl('name').setValue(symbolObj.symbol);
    // Value would typically come from an API, using placeholder value for now
    this.getControl('value').setValue(1);
  }

 /*  private symbolValidator(): AsyncValidatorFn {
    // return a function that will be called when the symbol field is changed
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const result = of(null);
      control.setErrors(null);
      const selectedSymbol = control.value;
      this.existingAssetForSymbol = null;
      if (!selectedSymbol) return result;
      return this.assetsStore.selectAssetBySymbol$(selectedSymbol).pipe(
        map(asset => {
          if(!asset || !asset.id) return null;
          this.existingAssetForSymbol = asset;
          control.setErrors({ symbolExists: true });
          return { symbolExists: true };
        })
      );
    };
  } */

  protected onSubmit() {
    const formValue = this.form.value;
    const asset: Asset = {
      id:0,
      name: this.getValue('name'),
      categoryId: this.getValue('categoryId'),
      symbol: this.getValue('symbol'),
      quantity: this.getValue('quantity'),
      value: this.getValue('value')
    };
    this.save.emit(asset);
    this.form.reset(NULL_ASSET);
  }

  protected getControl(controlName: string): AbstractControl {
    return this.form.get(controlName) as AbstractControl;
  }

  protected isInvalid(controlName: string): boolean {
    return this.getControl(controlName).invalid;
  }

  protected getErrors(controlName?: string): ValidationErrors | null {
    if(!controlName) return this.form.errors;
    return this.getControl(controlName).errors;
  }

  protected getValue(controlName: string): any {
    return this.getControl(controlName).value;
  }
}

