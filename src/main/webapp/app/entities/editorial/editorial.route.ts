import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEditorial, Editorial } from 'app/shared/model/editorial.model';
import { EditorialService } from './editorial.service';
import { EditorialComponent } from './editorial.component';
import { EditorialDetailComponent } from './editorial-detail.component';
import { EditorialUpdateComponent } from './editorial-update.component';

@Injectable({ providedIn: 'root' })
export class EditorialResolve implements Resolve<IEditorial> {
  constructor(private service: EditorialService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEditorial> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((editorial: HttpResponse<Editorial>) => {
          if (editorial.body) {
            return of(editorial.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Editorial());
  }
}

export const editorialRoute: Routes = [
  {
    path: '',
    component: EditorialComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.editorial.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EditorialDetailComponent,
    resolve: {
      editorial: EditorialResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.editorial.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EditorialUpdateComponent,
    resolve: {
      editorial: EditorialResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.editorial.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EditorialUpdateComponent,
    resolve: {
      editorial: EditorialResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.editorial.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
