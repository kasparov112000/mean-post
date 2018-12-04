import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Donation, DonationListConfig } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class DonationsService {
  constructor(
    private apiService: ApiService
  ) { }

  query(config: DonationListConfig): Observable<{ donations: Donation[], donationsCount: number }> {
    // Convert any filters over to Angular's URLSearchParams
    const params = {};

    Object.keys(config.filters)
      .forEach((key) => {
        params[key] = config.filters[key];
      });

    return this.apiService
      .get(
        '/donations' + ((config.type === 'feed') ? '/feed' : ''),
        new HttpParams({ fromObject: params })
      );
  }

  get(slug): Observable<Donation> {
    return this.apiService.get('/donations/' + slug)
      .pipe(map(data => data.donation));
  }

  destroy(slug) {
    return this.apiService.delete('/donations/' + slug);
  }

  save(donation): Observable<Donation> {
    // If we're updating an existing donation
    if (donation.slug) {
      return this.apiService.put('/donations/' + donation.slug, { donation: donation })
        .pipe(map(data => data.donation));

      // Otherwise, create a new donation
    } else {
      return this.apiService.post('/donations/', { donation: donation })
        .pipe(map(data => data.donation));
    }
  }

  favorite(slug): Observable<Donation> {
    return this.apiService.post('/donations/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Donation> {
    return this.apiService.delete('/donations/' + slug + '/favorite');
  }


}
