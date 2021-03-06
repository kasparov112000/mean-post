import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogListConfig } from '../core';
import { AuthService } from '../auth/auth.service';

// import { BlogListConfig, TagsService, UserService } from '../core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    // ,
    // private tagsService: TagsService,
     private userService: AuthService
  ) {}

  isAuthenticated: boolean;
  frontPage: true;

  listConfig: BlogListConfig = {
    type: 'all',
    filters: {}
  };
  tags: Array<string> = [];
  tagsLoaded = false;

  ngOnInit() {
    this.userService.getAuthStatusListener().subscribe(
      (authenticated) => {       

        this.isAuthenticated = authenticated;
        console.log(authenticated);
        // set the blog list accordingly
        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      }
    );
    // this.tagsService.getAll()
    // .subscribe(tags => {
    //   this.tags = tags;
    //   this.tagsLoaded = true;
    //   });
  }

  setListTo(type: string = 'feed', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list object
    this.listConfig = {type: type, filters: filters};
  }
}