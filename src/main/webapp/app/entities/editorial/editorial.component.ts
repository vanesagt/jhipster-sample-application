import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEditorial } from 'app/shared/model/editorial.model';
import { EditorialService } from './editorial.service';
import { EditorialDeleteDialogComponent } from './editorial-delete-dialog.component';

@Component({
  selector: 'jhi-editorial',
  templateUrl: './editorial.component.html'
})
export class EditorialComponent implements OnInit, OnDestroy {
  editorials?: IEditorial[];
  eventSubscriber?: Subscription;

  constructor(protected editorialService: EditorialService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.editorialService.query().subscribe((res: HttpResponse<IEditorial[]>) => (this.editorials = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEditorials();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEditorial): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEditorials(): void {
    this.eventSubscriber = this.eventManager.subscribe('editorialListModification', () => this.loadAll());
  }

  delete(editorial: IEditorial): void {
    const modalRef = this.modalService.open(EditorialDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.editorial = editorial;
  }
}
