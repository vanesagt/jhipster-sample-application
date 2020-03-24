import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IComentario } from 'app/shared/model/comentario.model';

type EntityResponseType = HttpResponse<IComentario>;
type EntityArrayResponseType = HttpResponse<IComentario[]>;

@Injectable({ providedIn: 'root' })
export class ComentarioService {
  public resourceUrl = SERVER_API_URL + 'api/comentarios';

  constructor(protected http: HttpClient) {}

  create(comentario: IComentario): Observable<EntityResponseType> {
    return this.http.post<IComentario>(this.resourceUrl, comentario, { observe: 'response' });
  }

  update(comentario: IComentario): Observable<EntityResponseType> {
    return this.http.put<IComentario>(this.resourceUrl, comentario, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IComentario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IComentario[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
