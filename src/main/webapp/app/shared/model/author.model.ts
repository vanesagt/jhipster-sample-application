import { ILocation } from 'app/shared/model/location.model';
import { IBook } from 'app/shared/model/book.model';

export interface IAuthor {
  id?: number;
  name?: string;
  apellido?: string;
  locations?: ILocation[];
  books?: IBook[];
}

export class Author implements IAuthor {
  constructor(public id?: number, public name?: string, public apellido?: string, public locations?: ILocation[], public books?: IBook[]) {}
}
