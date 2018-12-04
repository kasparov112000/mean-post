import { Component, Input } from '@angular/core';

import { Donation, DonationListConfig, DonationsService } from '../../core';

@Component({
  selector: 'app-donation-list',
  styleUrls: ['donation-list.component.css'],
  templateUrl: './donation-list.component.html'
})
export class DonationListComponent {
  constructor(
    private donationsService: DonationsService
  ) { }

  @Input() limit: number;
  @Input()
  set config(config: DonationListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: DonationListConfig;
  results: Donation[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = (this.limit * (this.currentPage - 1));
    }

    this.donationsService.query(this.query)
      .subscribe(data => {
        this.loading = false;
        this.results = data.donations;
        // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
        this.totalPages = Array.from(new Array(Math.ceil(data.donationsCount / this.limit)), (val, index) => index + 1);
      });
  }
}
