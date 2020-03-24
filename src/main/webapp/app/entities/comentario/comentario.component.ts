import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IComentario } from 'app/shared/model/comentario.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ComentarioService } from './comentario.service';
import { ComentarioDeleteDialogComponent } from './comentario-delete-dialog.component';

@Component({
  selector: 'jhi-comentario',
  templateUrl: './comentario.component.html'
})
export class ComentarioComponent implements OnInit, OnDestroy {
  comentarios: IComentario[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected comentarioService: ComentarioService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.comentarios = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.comentarioService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IComentario[]>) => this.paginateComentarios(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.comentarios = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInComentarios();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IComentario): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInComentarios(): void {
    this.eventSubscriber = this.eventManager.subscribe('comentarioListModification', () => this.reset());
  }

  delete(comentario: IComentario): void {
    const modalRef = this.modalService.open(ComentarioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.comentario = comentario;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateComentarios(data: IComentario[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.comentarios.push(data[i]);
      }
    }
  }
}
