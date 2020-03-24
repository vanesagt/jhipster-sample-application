import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IComentario, Comentario } from 'app/shared/model/comentario.model';
import { ComentarioService } from './comentario.service';
import { IBook } from 'app/shared/model/book.model';
import { BookService } from 'app/entities/book/book.service';

@Component({
  selector: 'jhi-comentario-update',
  templateUrl: './comentario-update.component.html'
})
export class ComentarioUpdateComponent implements OnInit {
  isSaving = false;
  books: IBook[] = [];

  editForm = this.fb.group({
    id: [],
    comentario: [null, [Validators.required]],
    valoracion: [],
    book: []
  });

  constructor(
    protected comentarioService: ComentarioService,
    protected bookService: BookService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ comentario }) => {
      this.updateForm(comentario);

      this.bookService.query().subscribe((res: HttpResponse<IBook[]>) => (this.books = res.body || []));
    });
  }

  updateForm(comentario: IComentario): void {
    this.editForm.patchValue({
      id: comentario.id,
      comentario: comentario.comentario,
      valoracion: comentario.valoracion,
      book: comentario.book
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const comentario = this.createFromForm();
    if (comentario.id !== undefined) {
      this.subscribeToSaveResponse(this.comentarioService.update(comentario));
    } else {
      this.subscribeToSaveResponse(this.comentarioService.create(comentario));
    }
  }

  private createFromForm(): IComentario {
    return {
      ...new Comentario(),
      id: this.editForm.get(['id'])!.value,
      comentario: this.editForm.get(['comentario'])!.value,
      valoracion: this.editForm.get(['valoracion'])!.value,
      book: this.editForm.get(['book'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComentario>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IBook): any {
    return item.id;
  }
}
