import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'discover' },
  { path: 'discover', loadComponent: () => import('./features/news/pages/discover/discover.component').then((module) => module.DiscoverComponent) },
  { path: 'stories/:id', loadComponent: () => import('./features/news/pages/article-detail/article-detail.component').then((module) => module.ArticleDetailComponent) },
  { path: '**', redirectTo: 'discover' },
];
