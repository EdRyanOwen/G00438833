import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'recipe-details/:id',
    loadComponent: () => import('./pages/recipe-details/recipe-details.page').then(m => m.RecipeDetailsPage)
  },
];