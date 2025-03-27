import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rates } from 'src/app/shared/rates.service';
import { PageComponent } from 'src/app/shared/ui/page/page.component';
@Component({
  selector: 'lab-rates',
  imports: [PageComponent, KeyValuePipe, DecimalPipe],
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css'],
  standalone: true,
})
export class RatesComponent {
  protected rates!: Rates;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.rates = data['rates'];
    });
  }
}
