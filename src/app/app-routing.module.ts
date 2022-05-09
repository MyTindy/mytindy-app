import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'confirm',
    loadChildren: () =>
      import('./pages/confirm-pin/confirm-pin.module').then(
        (m) => m.ConfirmPinPageModule
      ),
  },
  {
    path: 'take-photo',
    loadChildren: () =>
      import('./pages/take-photo/take-photo.module').then(
        (m) => m.TakePhotoPageModule
      ),
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./pages/landing/landing.module').then((m) => m.LandingPageModule),
  },
  {
    path: 'lock',
    loadChildren: () =>
      import('./pages/lock/lock.module').then((m) => m.LockPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
