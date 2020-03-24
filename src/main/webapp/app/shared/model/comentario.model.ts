import { IBook } from 'app/shared/model/book.model';

export interface IComentario {
  id?: number;
  comentario?: string;
  valoracion?: number;
  book?: IBook;
}

export class Comentario implements IComentario {
  constructor(public id?: number, public comentario?: string, public valoracion?: number, public book?: IBook) {}
}
