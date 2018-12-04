import { Component, Input } from '@angular/core';
import { Donation } from '../../core';

@Component({
  selector: 'app-donation-meta',
  templateUrl: './donation-meta.component.html'
})
export class DonationMetaComponent {
  @Input() donation: Donation;
}
