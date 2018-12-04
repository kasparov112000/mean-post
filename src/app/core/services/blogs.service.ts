import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Blog, BlogListConfig } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class BlogsService {
  constructor (
    private apiService: ApiService
  ) {}

  query(config: BlogListConfig): Observable<{blogs: Blog[], blogsCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params = {};

    Object.keys(config.filters)
    .forEach((key) => {
      params[key] = config.filters[key];
    });

    return this.apiService
    .get(
      '/blogs' + ((config.type === 'feed') ? '/feed' : ''),
      new HttpParams({ fromObject: params })
    );
  }

  get(slug): Observable<Blog> {
    return this.apiService.get('/blogs/' + slug)
      .pipe(map(data => data.blog));
  }

  destroy(slug) {
    return this.apiService.delete('/blogs/' + slug);
  }

  save(blog): Observable<Blog> {
    // If we're updating an existing blog
    if (blog.slug) {
      return this.apiService.put('/blogs/' + blog.slug, {blog: blog})
        .pipe(map(data => data.blog));

    // Otherwise, create a new blog
    } else {
      return this.apiService.post('/blogs/', {blog: blog})
        .pipe(map(data => data.blog));
    }
  }

  favorite(slug): Observable<Blog> {
    return this.apiService.post('/blogs/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Blog> {
    return this.apiService.delete('/blogs/' + slug + '/favorite');
  }


}
