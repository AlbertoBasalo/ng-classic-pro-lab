import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DetailsComponent } from "./details/details.component";
import { PageComponent } from "./page/page.component";
import { SearchComponent } from './search/search.component';

@NgModule({
    imports: [CommonModule, PageComponent, DetailsComponent, SearchComponent],
    exports: [PageComponent, DetailsComponent, SearchComponent],
})
export class UiModule {}

