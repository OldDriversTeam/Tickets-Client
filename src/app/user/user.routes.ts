import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';

export const userRoutes = [
    {
        path: '',
        component: UserComponent,
        children: [
          {
            path: 'profile',
            component: UserProfileComponent
          },
          {
            path: '',
            redirectTo: 'profile',
            pathMatch:'full'
          },
          {
            path: 'myTickets',
            component: MyTicketsComponent
          }
        ]
    }
]
