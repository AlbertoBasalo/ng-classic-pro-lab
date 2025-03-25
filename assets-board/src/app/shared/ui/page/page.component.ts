import { Component, Input } from "@angular/core";
import { NgIf } from "@angular/common";

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    standalone: true,
    imports: [NgIf]
})
export class PageComponent {
  @Input() title: string = '';
  @Input() subtitle: string | undefined;
}

