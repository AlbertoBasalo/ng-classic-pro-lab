import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'lab-theme-toggle',
    templateUrl: './theme-toggle.component.html',
    styleUrls: ['./theme-toggle.component.css'],
    standalone: true,
    imports: [NgIf],
})
export class ThemeToggleComponent {
  protected theme = localStorage.getItem('theme') || 'light';
  protected toggleTheme(): void {
    if (this.theme === 'light') {
      this.theme = 'dark';
    } else {
      this.theme = 'light';
    }
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }
}
