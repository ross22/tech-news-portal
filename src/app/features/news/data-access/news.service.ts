import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { NewsArticle } from '../models/news-article.model';

const ARTICLES: NewsArticle[] = [
  { id: 1, category: 'AI & ML', title: 'The next wave of AI is learning to work with the tools we already use', summary: 'A new generation of assistants can move between apps, plan multi-step work, and keep humans in the loop.', author: 'Maya Chen', publishedAt: '12 min ago', readTime: '6 min read', accent: 'violet', tag: 'Future of work' },
  { id: 2, category: 'Startups', title: 'Inside the tiny teams building the next billion-dollar companies', summary: 'Founders are trading big headcounts for focused teams and a new generation of AI-native products.', author: 'Jordan Lee', publishedAt: '38 min ago', readTime: '8 min read', accent: 'coral', tag: 'The builders' },
  { id: 3, category: 'Gadgets', title: 'A week with the new generation of everyday smart glasses', summary: 'Better battery life and quieter design make these wearables feel less like a prototype and more like a habit.', author: 'Sam Rivera', publishedAt: '1 hr ago', readTime: '5 min read', accent: 'blue', tag: 'Hands-on' },
  { id: 4, category: 'Science', title: 'The observatory mapping a changing universe in unprecedented detail', summary: 'Researchers are using a flood of fresh cosmic data to answer some very old questions about our place in space.', author: 'Priya Nair', publishedAt: '2 hrs ago', readTime: '7 min read', accent: 'green', tag: 'Discovery' },
  { id: 5, category: 'AI & ML', title: 'Why open models are finding a home on your laptop', summary: 'Smaller, more capable models are bringing private, offline AI within reach of everyday computers.', author: 'Alex Morgan', publishedAt: '3 hrs ago', readTime: '4 min read', accent: 'gold', tag: 'Explainer' },
  { id: 6, category: 'Startups', title: 'Can a new wave of climate tech make clean power boring?', summary: 'A group of pragmatic founders is focused on the unglamorous infrastructure that could reshape the grid.', author: 'Noah Patel', publishedAt: '5 hrs ago', readTime: '9 min read', accent: 'mint', tag: 'Climate tech' },
];

@Injectable({ providedIn: 'root' })
export class NewsService {
  getArticles(): Observable<NewsArticle[]> {
    // Simulate a network request so loading and stream behavior can be explored.
    return of(ARTICLES).pipe(delay(450));
  }

  getArticleById(id: number): Observable<NewsArticle | undefined> {
    return this.getArticles().pipe(map((articles) => articles.find((article) => article.id === id)));
  }
}
