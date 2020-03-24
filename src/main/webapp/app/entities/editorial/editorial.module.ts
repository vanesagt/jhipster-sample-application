import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { EditorialComponent } from './editorial.component';
import { EditorialDetailComponent } from './editorial-detail.component';
import { EditorialUpdateComponent } from './editorial-update.component';
import { EditorialDeleteDialogComponent } from './editorial-delete-dialog.component';
import { editorialRoute } from './editorial.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(editorialRoute)],
  declarations: [EditorialComponent, EditorialDetailComponent, EditorialUpdateComponent, EditorialDeleteDialogComponent],
  entryComponents: [EditorialDeleteDialogComponent]
})
export class JhipsterSampleApplicationEditorialModule {}
