import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEditorial } from 'app/shared/model/editorial.model';
import { EditorialService } from './editorial.service';

@Component({
  templateUrl: './editorial-delete-dialog.component.html'
})
export class EditorialDeleteDialogComponent {
  editorial?: IEditorial;

  constructor(protected editorialService: EditorialService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.editorialService.delete(id).subscribe(() => {
      this.eventManager.broadcast('editorialListModification');
      this.activeModal.close();
    });
  }
}
