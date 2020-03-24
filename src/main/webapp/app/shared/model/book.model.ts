import { IComentario } from 'app/shared/model/comentario.model';
import { IAuthor } from 'app/shared/model/author.model';

export interface IBook {
  id?: number;
  title?: string;
  description?: string;
  comentarios?: IComentario[];
  authors?: IAuthor[];
}

export class Book implements IBook {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public comentarios?: IComentario[],
    public authors?: IAuthor[]
  ) {}
}
