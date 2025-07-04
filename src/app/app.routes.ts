import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { DashboardComponent } from './Docente/modules/dashboard/dashboard.component';
import { SensoresComponent } from './Docente/pages/sensores/sensores.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // Docente
    { path: 'dashboard-docente', component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'sensores', component: SensoresComponent },
        ]
    }
];
