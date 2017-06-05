import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { MovieDescriptionComponent } from './movie/movie-description/movie-description.component';
import { SeatComponent } from './movie/seat/seat.component';
import { ConfirmOrderComponent } from './movie/confirm-order/confirm-order.component';
import { PaySuccessComponent } from './movie/pay-success/pay-success.component';

export const appRoutes = [
    {
        path: '',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'login',
        component: UserLoginComponent
    },
    {
        path: 'register',
        component: UserRegisterComponent
    },
    {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
    },
    {
        path: 'movieDescription/:id',
        component: MovieDescriptionComponent
    },
    {
        path: 'seat/:cinemaId/:showingId/:movieId',
        component: SeatComponent
    },
    {
        path: 'confirmOrder/:cinemaId/:showingId/:movieId',
        component: ConfirmOrderComponent
    },
    {
        path: 'paySuccess',
        component: PaySuccessComponent
    }
]