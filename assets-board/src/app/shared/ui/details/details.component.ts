import { Component, Input } from '@angular/core';
import { NgIf, JsonPipe } from '@angular/common';

@Component({
    selector: 'lab-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
    standalone: true,
    imports: [NgIf, JsonPipe]
})
export class DetailsComponent {
  @Input() details: Record<string, any> = {};
}
