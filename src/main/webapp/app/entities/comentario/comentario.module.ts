import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { ComentarioComponent } from './comentario.component';
import { ComentarioDetailComponent } from './comentario-detail.component';
import { ComentarioUpdateComponent } from './comentario-update.component';
import { ComentarioDeleteDialogComponent } from './comentario-delete-dialog.component';
import { comentarioRoute } from './comentario.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(comentarioRoute)],
  declarations: [ComentarioComponent, ComentarioDetailComponent, ComentarioUpdateComponent, ComentarioDeleteDialogComponent],
  entryComponents: [ComentarioDeleteDialogComponent]
})
export class JhipsterSampleApplicationComentarioModule {}
