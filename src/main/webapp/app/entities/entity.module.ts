import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'book',
        loadChildren: () => import('./book/book.module').then(m => m.JhipsterSampleApplicationBookModule)
      },
      {
        path: 'editorial',
        loadChildren: () => import('./editorial/editorial.module').then(m => m.JhipsterSampleApplicationEditorialModule)
      },
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m => m.JhipsterSampleApplicationAuthorModule)
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.JhipsterSampleApplicationLocationModule)
      },
      {
        path: 'comentario',
        loadChildren: () => import('./comentario/comentario.module').then(m => m.JhipsterSampleApplicationComentarioModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterSampleApplicationEntityModule {}
