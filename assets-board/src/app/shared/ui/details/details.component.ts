import { Component, Input } from '@angular/core';

@Component({
  selector: 'lab-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  @Input() details: Record<string, any> = {};
}
