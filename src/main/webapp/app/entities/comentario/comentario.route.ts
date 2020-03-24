import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IComentario, Comentario } from 'app/shared/model/comentario.model';
import { ComentarioService } from './comentario.service';
import { ComentarioComponent } from './comentario.component';
import { ComentarioDetailComponent } from './comentario-detail.component';
import { ComentarioUpdateComponent } from './comentario-update.component';

@Injectable({ providedIn: 'root' })
export class ComentarioResolve implements Resolve<IComentario> {
  constructor(private service: ComentarioService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IComentario> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((comentario: HttpResponse<Comentario>) => {
          if (comentario.body) {
            return of(comentario.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Comentario());
  }
}

export const comentarioRoute: Routes = [
  {
    path: '',
    component: ComentarioComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.comentario.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ComentarioDetailComponent,
    resolve: {
      comentario: ComentarioResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.comentario.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ComentarioUpdateComponent,
    resolve: {
      comentario: ComentarioResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.comentario.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ComentarioUpdateComponent,
    resolve: {
      comentario: ComentarioResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.comentario.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
