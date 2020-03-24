import { IAuthor } from 'app/shared/model/author.model';

export interface ILocation {
  id?: number;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  author?: IAuthor;
}

export class Location implements ILocation {
  constructor(
    public id?: number,
    public streetAddress?: string,
    public postalCode?: string,
    public city?: string,
    public stateProvince?: string,
    public author?: IAuthor
  ) {}
}
