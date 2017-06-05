import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { userRoutes } from './user.routes';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [UserComponent, UserProfileComponent, MyTicketsComponent]
})
export class UserModule { }
