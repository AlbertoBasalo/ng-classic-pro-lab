import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rates } from 'src/app/shared/rates.service';

@Component({
  selector: 'lab-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
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
