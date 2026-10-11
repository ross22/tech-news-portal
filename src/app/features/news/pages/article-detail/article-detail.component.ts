import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { NewsService } from '../../data-access/news.service';

@Component({
  imports: [AsyncPipe, RouterLink],
  selector: 'app-article-detail',
  styleUrl: './article-detail.component.scss',
  templateUrl: './article-detail.component.html',
})
export class ArticleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly newsService = inject(NewsService);

  protected readonly article$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id) => this.newsService.getArticleById(id)),
  );
}
