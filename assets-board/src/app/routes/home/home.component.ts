import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from 'src/app/domain/asset.type';
import { Category } from 'src/app/domain/category.type';
import { HomeService } from './home.service';

@Component({
  selector: 'lab-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  protected assets$: Observable<Asset[]> = this.homeService.getAssets$();
  protected categories$: Observable<Category[]> = this.homeService.getCategories$();

  constructor(private homeService: HomeService) {}
}
