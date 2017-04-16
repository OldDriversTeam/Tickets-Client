import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

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
          }
        ]
    }
]
