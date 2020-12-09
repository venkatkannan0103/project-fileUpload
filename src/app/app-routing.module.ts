import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Have used lazy loading just to show the modularization
export const routes: Routes = [
  {
    path: 'screens',
    loadChildren: () => import('./screens/screens.module').then(m => m.ScreensModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
