import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { AssetsStoreService } from './assets/assets-store.service';

export const AssetValidators = {
  /**
   * Validates that the value is an even number
   */
  even: evenValidator,
  /**
   * Validates that the total investment does not exceed the maximum investment
   * @param maxInvestment - The maximum investment
   */
  maxInvestment: maxInvestmentValidator,
  /**
   * Validates that the symbol is unique
   */
  symbol: symbolValidator
}

/**
 * Validates that the value is an even number
 * @param control - The control to validate
 * @returns null if the value is even, or an error object if it is not
 */
function evenValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  const isValid = value % 2 === 0;
  if (isValid) return null;
  const error: ValidationErrors = {
    even: `${value} is not an even number`,
  };
  return error;
}


/**
 * Validates that the total investment does not exceed the maximum investment
 * @param maxInvestment - The maximum investment
 * @returns a function that returns null if the total investment does not exceed the maximum investment, or an error object if it does
 */
function maxInvestmentValidator(
  maxInvestment: number
): ValidatorFn {
  const validationFn = (form: AbstractControl): ValidationErrors | null => {
    const quantity = form.get('quantity')?.value;
    const value = form.get('value')?.value;
    const totalInvestment = quantity * value;
    const isValid = totalInvestment <= maxInvestment;
    if (isValid) return null;
    const error: ValidationErrors = {
      maxInvestment: `Investment cannot exceed ${maxInvestment}`,
    };
    return error;
  };
  return validationFn;
}

/**
 * Validates that the symbol is unique
 * @param assetsStore - The assets store
 * @returns a function that returns null if the symbol is unique, or an error object if it is not
 */
function symbolValidator(assetsStore: AssetsStoreService): AsyncValidatorFn {
    // return a function that will be called when the symbol field is changed
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      control.setErrors(null);
      const selectedSymbol = control.value;
      if (!selectedSymbol) return of(null);
      return assetsStore.selectAssetBySymbol$(selectedSymbol).pipe(
        map(asset => {
          if(!asset || !asset.id) return null;
          control.setErrors({ symbolExists: true });
          return { symbolExists: true };
        })
      );
    };
  }