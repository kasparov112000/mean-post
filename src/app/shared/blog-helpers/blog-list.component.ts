import { Component, Input } from '@angular/core';

import { Blog, BlogListConfig, BlogsService } from '../../core';
@Component({
  selector: 'app-blog-list',
  styleUrls: ['blog-list.component.scss'],
  templateUrl: './blog-list.component.html'
})
export class BlogListComponent {
  constructor (
    private blogsService: BlogsService
  ) {}

  @Input() limit: number;
  @Input() frontPage: boolean;
  @Input()
  set config(config: BlogListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: BlogListConfig;
  results: Blog[];
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

    this.blogsService.query(this.query)
    .subscribe(data => {
      this.loading = false;
      this.results = data.blogs;

      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      this.totalPages = Array.from(new Array(Math.ceil(data.blogsCount / this.limit)), (val, index) => index + 1);
    });
  }
}
