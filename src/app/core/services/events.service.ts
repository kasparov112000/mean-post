import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Event, EventListConfig } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class EventsService {
  constructor (
    private apiService: ApiService
  ) {}

  query(config: EventListConfig): Observable<{events: Event[], eventsCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params = {};

    Object.keys(config.filters)
    .forEach((key) => {
      params[key] = config.filters[key];
    });

    return this.apiService
    .get(
      '/events' + ((config.type === 'feed') ? '/feed' : ''),
      new HttpParams({ fromObject: params })
    );
  }

  get(slug): Observable<Event> {
    return this.apiService.get('/events/' + slug)
      .pipe(map(data => data.event));
  }

  destroy(slug) {
    return this.apiService.delete('/events/' + slug);
  }

  save(event): Observable<Event> {
    // If we're updating an existing event
    if (event.slug) {
      return this.apiService.put('/events/' + event.slug, {event: event})
        .pipe(map(data => data.event));

    // Otherwise, create a new event
    } else {
      return this.apiService.post('/events/', {event: event})
        .pipe(map(data => data.event));
    }
  }

  favorite(slug): Observable<Event> {
    return this.apiService.post('/events/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Event> {
    return this.apiService.delete('/events/' + slug + '/favorite');
  }

  attend(slug): Observable<Event> {
    return this.apiService.post('/events/' + slug + '/attend');
  }

  unattend(slug): Observable<Event> {
    return this.apiService.delete('/events/' + slug + '/unattend');
  }


}
