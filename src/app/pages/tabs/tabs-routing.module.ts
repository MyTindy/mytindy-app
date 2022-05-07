import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';


import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then((m) => m.HomePageModule),
          },
        ],
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then((m) => m.ProfilePageModule),
            // canActivate: [AuthGuard],
          },
        ],
      },

      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../settings/settings.module').then(
                (m) => m.SettingsPageModule
              ),
          },
        ],
      },
      {
        path: 'payment',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../payment/payment.module').then(
                (m) => m.PaymentPageModule
              ),
          },
        ],
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../notifications/notifications.module').then(
                (m) => m.NotificationsPageModule
              ),
          },
        ],
      },
      {
        path:'',
        redirectTo:'/tabs/home',
        pathMatch:'full'
      }
    ],
  },
  {
    path:'',
    redirectTo:'/tabs/home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
