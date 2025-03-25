import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from 'src/app/domain/asset.type';
import { Category } from 'src/app/domain/category.type';
import { HomeService } from './home.service';
import { RouterLink } from '@angular/router';
import { AssetsListComponent } from './assets-list/assets-list.component';
import { AsyncPipe } from '@angular/common';
import { PageComponent } from '../../shared/ui/page/page.component';

@Component({
    selector: 'lab-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [
    PageComponent,
    AssetsListComponent,
    RouterLink,
    AsyncPipe
],
})
export class HomeComponent {
  protected assets$: Observable<Asset[]> = this.homeService.getAssets$();
  protected categories$: Observable<Category[]> = this.homeService.getCategories$();

  constructor(private homeService: HomeService) {}
}
