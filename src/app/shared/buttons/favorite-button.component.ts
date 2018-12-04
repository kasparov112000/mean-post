import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Blog, BlogsService, UserService, EventsService, Donation } from '../../core';
import { of } from 'rxjs';
import { concatMap ,  tap } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html'
})
export class FavoriteButtonComponent {
  constructor(
    private blogsService: BlogsService,
    private router: Router,
    private userService: UserService,
    private eventService: EventsService
  ) {}

  @Input() blog: Blog;
  @Input() event: Event;
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

        // Favorite the blog if it isn't favorited yet
        if (!this.blog.favorited) {
          return this.blogsService.favorite(this.blog.slug)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            err => this.isSubmitting = false
          ));

        // Otherwise, unfavorite the blog
        } else {
          return this.blogsService.unfavorite(this.blog.slug)
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
