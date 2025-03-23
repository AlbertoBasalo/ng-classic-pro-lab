import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DetailsComponent } from "./details/details.component";
import { PageComponent } from "./page/page.component";

@NgModule({
  declarations: [PageComponent, DetailsComponent],
  imports: [CommonModule],
  exports: [PageComponent, DetailsComponent],
})
export class UiModule {}

