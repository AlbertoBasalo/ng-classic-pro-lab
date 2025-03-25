import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';

@Component({
    selector: 'lab-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [HeaderComponent, RouterOutlet]
})
export class AppComponent {
  title = 'assets-board';
}
