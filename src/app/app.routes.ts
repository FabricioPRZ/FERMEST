import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
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

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

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
        ]
    }
];
