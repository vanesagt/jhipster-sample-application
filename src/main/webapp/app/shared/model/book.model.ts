import { IEditorial } from 'app/shared/model/editorial.model';
import { IComentario } from 'app/shared/model/comentario.model';
import { IAuthor } from 'app/shared/model/author.model';

export interface IBook {
  id?: number;
  title?: string;
  description?: string;
  editorial?: IEditorial;
  comentarios?: IComentario[];
  authors?: IAuthor[];
}

export class Book implements IBook {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public editorial?: IEditorial,
    public comentarios?: IComentario[],
    public authors?: IAuthor[]
  ) {}
}
