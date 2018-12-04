import { Component, Input } from '@angular/core';

import { Blog } from '../../core';

@Component({
  selector: 'app-blog-meta',
  templateUrl: './blog-meta.component.html'
})
export class BlogMetaComponent {
  @Input() blog: Blog;
}
