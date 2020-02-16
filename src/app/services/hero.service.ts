import { Injectable } from '@angular/core';
import { Hero } from '../Models/hero';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(): Observable<Hero[]> {

    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.messageService.add('HeroService: fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {

    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap(_ => this.messageService.add(`HeroService: fetched hero id = ${id}`)),
      catchError(this.handleError(`getHero id=${id}`, null))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} filed ${error.message}`);
      return of(result as T);
    };
  }

  updateHero(hero: Hero) {
    const httpOptions = this.httpOptions;
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.messageService.add(`HeroService: updated hero id = ${hero.id}`)),
      catchError(this.handleError(`updateHero id=${hero.id}`, null))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    const httpOptions = this.httpOptions;
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap(res => this.messageService.add(`HeroService: added hero id = ${res.id}`)),
      catchError(this.handleError(`addHero name=${hero.name}`, null))
    );
  }

  deleteHero(id: number) {
    const httpOptions = this.httpOptions;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, httpOptions).pipe(
      tap(res => this.messageService.add(`HeroService: deleted hero id = ${id}`)),
      catchError(this.handleError(`deleteHero id=${id}`, null))
    );
  }

  searchHero(term: string) {
    term = term.trim();
    if (!term) {
      return of([]);
    }
    const url = `${this.heroesUrl}/?name=${term}`;
    return this.http.get<Hero[]>(url).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching ${term}`)
        : this.log(`no heroes matching ${term}`)),
      catchError(this.handleError(`searchHeroes match = ${term}`, []))
    );
  }
}
