import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { NewsService } from '../../data-access/news.service';
import { CATEGORIES, NewsArticle } from '../../models/news-article.model';

@Component({ imports: [AsyncPipe, RouterLink], selector: 'app-discover', styleUrl: './discover.component.scss', templateUrl: './discover.component.html' })
export class DiscoverComponent {
  private readonly newsService = inject(NewsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchInput$ = new BehaviorSubject('');
  private readonly category$ = new BehaviorSubject('All stories');
  protected readonly categories = CATEGORIES;
  protected readonly selectedCategory = signal('All stories');
  protected readonly search$ = this.searchInput$.pipe(debounceTime(250), distinctUntilChanged());
  protected readonly articles$ = this.newsService.getArticles().pipe(
    switchMap((articles) => combineLatest([this.search$.pipe(startWith('')), this.category$]).pipe(
      map(([query, category]) => this.filterArticles(articles, query, category)),
    )),
    takeUntilDestroyed(this.destroyRef),
  );

  protected onSearch(value: string): void { this.searchInput$.next(value); }
  protected selectCategory(category: string): void { this.selectedCategory.set(category); this.category$.next(category); }

  private filterArticles(articles: NewsArticle[], query: string, category: string): NewsArticle[] {
    const normalizedQuery = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory = category === 'All stories' || article.category === category;
      const text = `${article.title} ${article.summary} ${article.category} ${article.author}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || text.includes(normalizedQuery));
    });
  }
}
