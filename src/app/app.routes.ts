import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./modules/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'new-task',
    loadComponent: () => import('./modules/new-task/new-task.page').then((m) => m.NewTaskPage),
  },
  {
    path: 'category',
    loadComponent: () => import('./modules/category/category.page').then((m) => m.CategoryPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
