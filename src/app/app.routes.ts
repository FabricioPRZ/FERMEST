import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { DashboardComponent } from './Docente/modules/dashboard/dashboard.component';
import { SensoresComponent } from './Docente/pages/sensores/sensores.component';
import { PrincipalPageComponent } from './Docente/pages/principal-page/principal-page.component';
import { SensorsHistoryComponent } from './Docente/pages/sensors-history/sensors-history.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // Docente
    { path: 'dashboard-docente', component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'inicio', component: PrincipalPageComponent },
            { path: 'sensores', component: SensoresComponent },
            { path: 'history', component:SensorsHistoryComponent},
        ]
    }
];
