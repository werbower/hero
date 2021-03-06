
import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { RequestInfo } from 'angular-in-memory-web-api/interfaces';
import { Hero } from '../Models/hero';

const HEROES: Hero[] = [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {


  constructor(
    private messageService: MessageService,
  ) { }

  private log(message: string) {
    this.messageService.add(`InMemoryService: ${message}`);
  }

  createDb(reqInfo?: RequestInfo) {
    return {
      heroes: HEROES
    };
  }

  genId(table: any[]): number {
    return table.length > 0 ? Math.max(...table.map(t => t.id)) + 1 : 11;
  }


}
