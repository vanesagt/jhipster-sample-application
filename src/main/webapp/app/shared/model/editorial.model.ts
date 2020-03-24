import { IBook } from 'app/shared/model/book.model';

export interface IEditorial {
  id?: number;
  name?: string;
  book?: IBook;
}

export class Editorial implements IEditorial {
  constructor(public id?: number, public name?: string, public book?: IBook) {}
}
