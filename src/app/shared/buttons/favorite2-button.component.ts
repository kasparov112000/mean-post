import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Donation, DonationsService, UserService } from '../../core';
import { of } from 'rxjs';
import { concatMap ,  tap } from 'rxjs/operators';

@Component({
  selector: 'app-favorite2-button',
  templateUrl: './favorite2-button.component.html'
})
export class Favorite2ButtonComponent {
  constructor(
    private donationsService: DonationsService,
    private router: Router,
    private userService: UserService,
    private donationService: DonationsService
  ) { }

  @Input() donation: Donation;
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

        // Favorite the donation if it isn't favorited yet
        if (!this.donation.favorited) {
          return this.donationsService.favorite(this.donation.slug)
            .pipe(tap(
              data => {
                this.isSubmitting = false;
                this.toggle.emit(true);
              },
              err => this.isSubmitting = false
            ));

          // Otherwise, unfavorite the donation
        } else {
          return this.donationsService.unfavorite(this.donation.slug)
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
