import { Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';

// Docente
import { DashboardComponent } from './Docente/modules/dashboard/dashboard.component';
import { SensoresComponent } from './Docente/pages/sensores/sensores.component';
import { PrincipalPageComponent } from './Docente/pages/principal-page/principal-page.component';
import { SensorsHistoryComponent } from './Docente/pages/sensors-history/sensors-history.component';
import { StatisticsComponent } from './Docente/pages/statistics/statistics.component';
import { TemperatureChartComponent } from './Docente/components/charts/temperature-chart/temperature-chart.component';
import { AlcoholChartComponent } from './Docente/components/charts/alcohol-chart/alcohol-chart.component';
import { PhChartComponent } from './Docente/components/charts/ph-chart/ph-chart.component';
import { TurbidityChartComponent } from './Docente/components/charts/turbidity-chart/turbidity-chart.component';
import { ConductivityChartComponent } from './Docente/components/charts/conductivity-chart/conductivity-chart.component';
import { CalculatorComponent } from './Docente/pages/calculator/calculator.component';

// Administrador
import { DashboardAdministradorComponent } from './Administrador/modules/dashboard-administrador/dashboard-administrador.component';
import { PrincipalPageAdminComponent } from './Administrador/pages/principal-page-admin/principal-page-admin.component';
import { SensoresAdminComponent } from './Administrador/pages/sensores-admin/sensores-admin.component';
import { AddUsersComponent } from './Administrador/pages/add-users/add-users.component';
import { DashboardStudentComponent } from './Estudiante/modules/dashboard-student/dashboard-student.component';
import { PrincipalPageStudentComponent } from './Estudiante/pages/principal-page-student/principal-page-student.component';
import { StatisticsStudentComponent } from './Estudiante/pages/statistics-student/statistics-student.component';
import { ReportsStudentComponent } from './Estudiante/pages/reports-student/reports-student.component';
import { FermentationStudentComponent } from './Estudiante/pages/fermentation-student/fermentation-student.component';
import { ReportsComponent } from './Docente/pages/reports/reports.component';
import { FermentationComponent } from './Docente/pages/fermentation/fermentation.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { NotificationsComponent } from './modules/notifications/notifications.component';


export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: LandingPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'notifications', component: NotificationsComponent },

    // Docente
    { path: 'dashboard-docente', component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'inicio', component: PrincipalPageComponent },
            { path: 'statistics', component: StatisticsComponent,
                children: [
                    { path: '', redirectTo: 'temperatura', pathMatch: 'full' },
                    { path: 'temperatura', component: TemperatureChartComponent },
                    { path: 'alcohol', component: AlcoholChartComponent },
                    { path: 'ph', component: PhChartComponent },
                    { path: 'turbidez', component: TurbidityChartComponent },
                    { path: 'conductividad', component: ConductivityChartComponent }
                ]
            },
            { path: 'sensores', component: SensoresComponent },
            { path: 'history', component:SensorsHistoryComponent},
            { path: 'calculator', component: CalculatorComponent},
            { path: 'reports', component: ReportsComponent},
            { path: 'fermentation', component: FermentationComponent}
            
        ]
    },

    // Administrador
    { path: 'dashboard-administrador', component: DashboardAdministradorComponent,
        children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'inicio', component: PrincipalPageAdminComponent},
            { path: 'sensores', component: SensoresAdminComponent},
            { path: 'add-user', component: AddUsersComponent}
        ]
    },

    // Estudiante
    { path: 'dashboard-estudiante', component: DashboardStudentComponent,
        children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'inicio', component: PrincipalPageStudentComponent},
            { path: 'statistics', component: StatisticsStudentComponent,
                children: [
                    { path: '', redirectTo: 'temperatura', pathMatch: 'full' },
                    { path: 'temperatura', component: TemperatureChartComponent },
                    { path: 'alcohol', component: AlcoholChartComponent },
                    { path: 'ph', component: PhChartComponent },
                    { path: 'turbidez', component: TurbidityChartComponent },
                    { path: 'conductividad', component: ConductivityChartComponent }
                ]
            },
            { path: 'reports', component: ReportsStudentComponent},
            { path: 'fermentation', component: FermentationStudentComponent}
        ]
    }
];
