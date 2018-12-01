import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

// import { UserService } from '../core'; todo
import { take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HomeAuthResolver implements OnInit {
  
  private authStatusSub: Subscription;
  private authService: AuthService;
  private isLoading = false;

  constructor(
    private router: Router,
    private userService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
   }
}
