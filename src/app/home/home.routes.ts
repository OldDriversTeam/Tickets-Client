import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

export const homeRoutes = [
    {
        path: 'index',
        component: HomeComponent,
        children: [{
            path: '',
            loadChildren: '../movie/movie.module#MovieModule'
        }]
    },
    {
        path: '',
        redirectTo: 'index'
    }
]
