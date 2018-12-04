import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BlogListComponent, BlogMetaComponent, BlogPreviewComponent } from './blog-helpers';
import { FavoriteButtonComponent, FollowButtonComponent, AttendButtonComponent } from './buttons';
import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';
import { EventListComponent, EventPreviewComponent, EventMetaComponent } from './event-helpers';
import { Favorite1ButtonComponent, Favorite2ButtonComponent } from './buttons';
import { DonationListComponent, DonationPreviewComponent, DonationMetaComponent } from '.'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [

    DonationListComponent,
    DonationMetaComponent,
    DonationPreviewComponent,
    BlogListComponent,
    BlogMetaComponent,
    BlogPreviewComponent,
    EventListComponent,
    EventMetaComponent,
    EventPreviewComponent,
    FavoriteButtonComponent,
    Favorite1ButtonComponent,
    Favorite2ButtonComponent,
    FollowButtonComponent,
    AttendButtonComponent,
    ListErrorsComponent,
    ShowAuthedDirective
  ],
  exports: [
    BlogListComponent,
    BlogMetaComponent,
    BlogPreviewComponent,
    EventListComponent,
    EventMetaComponent,
    EventPreviewComponent,
    DonationListComponent,
    DonationMetaComponent,
    DonationPreviewComponent,
    CommonModule,
    FavoriteButtonComponent,
    Favorite1ButtonComponent,
    Favorite2ButtonComponent,
    FollowButtonComponent,
    AttendButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ListErrorsComponent,
    RouterModule,
    ShowAuthedDirective
  ]
})
export class SharedModule { }
