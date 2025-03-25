import { Component, Input } from "@angular/core";


@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    standalone: true,
    imports: []
})
export class PageComponent {
  @Input() title: string = '';
  @Input() subtitle: string | undefined;
}

