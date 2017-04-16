import { RouterModule } from '@angular/router';

import { MovieListComponent } from './movie-list/movie-list.component';

export const movieRoutes = [
    {
        path: '',
        component: MovieListComponent
    }
];