import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBook, Book } from 'app/shared/model/book.model';
import { BookService } from './book.service';
import { IEditorial } from 'app/shared/model/editorial.model';
import { EditorialService } from 'app/entities/editorial/editorial.service';

@Component({
  selector: 'jhi-book-update',
  templateUrl: './book-update.component.html'
})
export class BookUpdateComponent implements OnInit {
  isSaving = false;
  editorials: IEditorial[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    description: [],
    editorial: []
  });

  constructor(
    protected bookService: BookService,
    protected editorialService: EditorialService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ book }) => {
      this.updateForm(book);

      this.editorialService
        .query({ filter: 'book-is-null' })
        .pipe(
          map((res: HttpResponse<IEditorial[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEditorial[]) => {
          if (!book.editorial || !book.editorial.id) {
            this.editorials = resBody;
          } else {
            this.editorialService
              .find(book.editorial.id)
              .pipe(
                map((subRes: HttpResponse<IEditorial>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEditorial[]) => (this.editorials = concatRes));
          }
        });
    });
  }

  updateForm(book: IBook): void {
    this.editForm.patchValue({
      id: book.id,
      title: book.title,
      description: book.description,
      editorial: book.editorial
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const book = this.createFromForm();
    if (book.id !== undefined) {
      this.subscribeToSaveResponse(this.bookService.update(book));
    } else {
      this.subscribeToSaveResponse(this.bookService.create(book));
    }
  }

  private createFromForm(): IBook {
    return {
      ...new Book(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      editorial: this.editForm.get(['editorial'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBook>>): void {
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

  trackById(index: number, item: IEditorial): any {
    return item.id;
  }
}
