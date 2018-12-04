import { Component, Input } from '@angular/core';

import { Event } from '../../core';

@Component({
  selector: 'app-event-meta',
  templateUrl: './event-meta.component.html'
})
export class EventMetaComponent {
  @Input() event: Event;
}
