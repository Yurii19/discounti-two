import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeadComponent } from './head/head.component';
import { VendorComponent } from './vendor/vendor/vendor.component';
import { StatisticComponent } from './statistic/statistic/statistic.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { DescriptionComponent } from './description/description.component';
import { HomeComponent } from './home/home/home.component';
import { FavoriteComponent } from './profile/profile/favorite/favorite.component';
import { HistoryComponent } from './profile/profile/history/history.component';
import { ActiveComponent } from './profile/profile/active/active.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { ProfileRootComponent } from './profile/profile/profile-root/profile-root.component';
import { AdminContainerComponent } from './admin/admin-container/admin-container.component';

const routes: Routes = [
  {
    path: '',
    component: HeadComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'home/:id/description',
        component: DescriptionComponent,
      },
      {
        path: 'vendor',
        component: VendorComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'statistic',
        component: StatisticComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: '',
            component: ProfileRootComponent
          },
          {
            path: 'history',
            component: HistoryComponent,
          },
          {
            path: 'favorite',
            component: FavoriteComponent,
          },
          {
            path: 'active',
            component: ActiveComponent,
          },
        ],
      },
      {
        path: 'admin',
        component: AdminContainerComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeadRoutingModule {}
