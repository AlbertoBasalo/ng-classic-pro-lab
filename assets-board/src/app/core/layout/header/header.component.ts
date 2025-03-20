import { Component } from '@angular/core';
import { AssetsStoreService } from 'src/app/shared/store/assets-store.service';

@Component({
  selector: 'lab-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  protected title = 'Assets Board';

  protected totalAmount$ = this.assetsStore.selectTotalAmount$();

  constructor(private assetsStore: AssetsStoreService) {}
}
