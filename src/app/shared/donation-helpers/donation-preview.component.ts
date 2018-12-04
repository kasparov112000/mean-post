import { Component, Input } from '@angular/core';
import { Donation } from '../../core';

@Component({
  selector: 'app-donation-preview',
  templateUrl: './donation-preview.component.html'
})
export class DonationPreviewComponent {
  @Input() donation: Donation;

  onToggleFavorite(favorited: boolean) {
    this.donation['favorited'] = favorited;
    if (favorited) {
      this.donation['favoritesCount']++;
    } else {
      this.donation['favoritesCount']--;
    }
  }
}
