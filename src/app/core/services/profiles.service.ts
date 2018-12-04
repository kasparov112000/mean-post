import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event as Evento} from '../models';
import { ApiService } from './api.service';
import { Profile } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfilesService {
  constructor(
    private apiService: ApiService
  ) { }

  get(username: string): Observable<Profile> {
    return this.apiService.get('/profiles/' + username)
      .pipe(map((data: { profile: Profile }) => data.profile));
  }

  follow(username: string): Observable<Profile> {
    return this.apiService.post('/profiles/' + username + '/follow');
  }

  unfollow(username: string): Observable<Profile> {
    return this.apiService.delete('/profiles/' + username + '/follow');
  }

  attend(username: string): Observable<Evento> {
    return this.apiService.post('/event/' + username + '/attend');
  }

  unattend(username: string): Observable<Evento> {
    return this.apiService.delete('/event/' + username + '/attend');
  }



}
