import { MessageService } from './../services/message.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../Models/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes );
  }

  addHero(name: string) {
    name = (name || '').trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  deleteHero(id: number) {
    this.heroService.deleteHero(id)
      .subscribe(_ => {
        this.heroes = this.heroes.filter(x => x.id !== id);
      });
  }
}
