import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Asset } from 'src/app/domain/asset.type';

@Component({
  selector: 'lab-edit-asset-form',
  templateUrl: './edit-asset-form.component.html',
  styleUrls: ['./edit-asset-form.component.css']
})
export class EditAssetFormComponent implements OnInit {
  @Input() public asset!: Asset;
  @Output() public update: EventEmitter<Asset> = new EventEmitter();
  @Output() public delete: EventEmitter<void> = new EventEmitter();

  protected form: FormGroup = this.fb.group({
    quantity: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.asset) {
      this.form.patchValue({
        quantity: this.asset.quantity
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const updatedAsset: Asset = {
        ...this.asset,
        quantity: this.form.value.quantity
      };
      this.update.emit(updatedAsset);
    }
  }

  onDelete() {
    this.delete.emit();
  }
}
