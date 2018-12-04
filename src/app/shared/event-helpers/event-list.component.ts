import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared';
import { Event, EventListConfig, EventsService } from '../../core';
@Component({
  selector: 'app-event-list',
  styleUrls: ['event-list.component.scss'],
  templateUrl: './event-list.component.html'
})
export class EventListComponent {
  constructor (
    private eventsService: EventsService
  ) {}

  @Input() limit: number;
  @Input()
  set config(config: EventListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: EventListConfig;
  results: Event[];
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
      this.query.filters.offset =  (this.limit * (this.currentPage - 1));
    }

    this.eventsService.query(this.query)
    .subscribe(data => {
      this.loading = false;
      this.results = data.events;

      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      this.totalPages = Array.from(new Array(Math.ceil(data.eventsCount / this.limit)), (val, index) => index + 1);
    });
  }
}
