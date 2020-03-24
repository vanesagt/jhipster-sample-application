import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEditorial } from 'app/shared/model/editorial.model';

type EntityResponseType = HttpResponse<IEditorial>;
type EntityArrayResponseType = HttpResponse<IEditorial[]>;

@Injectable({ providedIn: 'root' })
export class EditorialService {
  public resourceUrl = SERVER_API_URL + 'api/editorials';

  constructor(protected http: HttpClient) {}

  create(editorial: IEditorial): Observable<EntityResponseType> {
    return this.http.post<IEditorial>(this.resourceUrl, editorial, { observe: 'response' });
  }

  update(editorial: IEditorial): Observable<EntityResponseType> {
    return this.http.put<IEditorial>(this.resourceUrl, editorial, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEditorial>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEditorial[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
