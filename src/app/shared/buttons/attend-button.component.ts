import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Profile, ProfilesService, EventsService, UserService, Event as Evento } from '../../core';
import { concatMap ,  tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-attend-button',
  templateUrl: './attend-button.component.html'
})
export class AttendButtonComponent {
  constructor(
    private profilesService: ProfilesService,
    private eventsService: EventsService,
    private router: Router,
    private userService: UserService
  ) { }

  @Input() event: Evento;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
  profile: Profile;

  toggleAttending() {
    this.isSubmitting = true;
    // TODO: remove nested subscribes, use mergeMap
    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        // Follow this profile if we aren't already
        if (!this.event.attending) {
          return this.eventsService.attend(this.event.slug)
            .pipe(tap(
              data => {
                this.isSubmitting = false;
                this.toggle.emit(true);
              },
              err => this.isSubmitting = false
            ));

          // Otherwise, unattend this profile
        } else {
          return this.eventsService.unattend(this.event.slug)
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
