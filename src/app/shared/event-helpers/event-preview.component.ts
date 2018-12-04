import { Component, Input } from '@angular/core';
import { Event } from '../../core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html'
})
export class EventPreviewComponent {
  @Input() event: Event;
  // onToggleFavorite(favorited: boolean) {
  //   this.event['favorited'] = favorited;

  //   if (favorited) {
  //     this.event['favoritesCount']++;
  //   } else {
  //     this.event['favoritesCount']--;
  //   }
  // }

  onToggleAttending(attending: boolean) {
    this.event.attending = attending;
  }
}
