import { Component } from '@angular/core';
import { AssetsStoreService } from 'src/app/shared/assets/assets-store.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'lab-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [
        RouterLink,
        ThemeToggleComponent,
        AsyncPipe,
        CurrencyPipe,
    ],
})
export class HeaderComponent {
  protected title = 'Assets Board';

  protected totalAmount$ = this.assetsStore.selectTotalAmount$();

  constructor(private assetsStore: AssetsStoreService) {}
}
