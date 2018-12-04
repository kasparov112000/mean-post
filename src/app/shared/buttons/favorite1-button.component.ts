import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Event, EventsService, UserService } from '../../core';
import { of } from 'rxjs';
import { concatMap ,  tap } from 'rxjs/operators';

@Component({
  selector: 'app-favorite1-button',
  templateUrl: './favorite1-button.component.html'
})
export class Favorite1ButtonComponent {
  constructor(
    private eventsService: EventsService,
    private router: Router,
    private userService: UserService,
    private eventService: EventsService
  ) { }

  @Input() event: Event;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        // Favorite the event if it isn't favorited yet
        if (!this.event.favorited) {
          return this.eventsService.favorite(this.event.slug)
            .pipe(tap(
              data => {
                this.isSubmitting = false;
                this.toggle.emit(true);
              },
              err => this.isSubmitting = false
            ));

          // Otherwise, unfavorite the event
        } else {
          return this.eventsService.unfavorite(this.event.slug)
            .pipe(tap(
              data => {
                this.isSubmitting = false;
                this.toggle.emit(false);
              },
              err => this.isSubmitting = false
            ));
        }

      }
    )).subscribe();
  }
}
