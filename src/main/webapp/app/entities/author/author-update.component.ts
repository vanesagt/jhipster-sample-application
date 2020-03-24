import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAuthor, Author } from 'app/shared/model/author.model';
import { AuthorService } from './author.service';
import { IBook } from 'app/shared/model/book.model';
import { BookService } from 'app/entities/book/book.service';

@Component({
  selector: 'jhi-author-update',
  templateUrl: './author-update.component.html'
})
export class AuthorUpdateComponent implements OnInit {
  isSaving = false;
  books: IBook[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    apellido: [],
    books: []
  });

  constructor(
    protected authorService: AuthorService,
    protected bookService: BookService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ author }) => {
      this.updateForm(author);

      this.bookService.query().subscribe((res: HttpResponse<IBook[]>) => (this.books = res.body || []));
    });
  }

  updateForm(author: IAuthor): void {
    this.editForm.patchValue({
      id: author.id,
      name: author.name,
      apellido: author.apellido,
      books: author.books
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const author = this.createFromForm();
    if (author.id !== undefined) {
      this.subscribeToSaveResponse(this.authorService.update(author));
    } else {
      this.subscribeToSaveResponse(this.authorService.create(author));
    }
  }

  private createFromForm(): IAuthor {
    return {
      ...new Author(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      apellido: this.editForm.get(['apellido'])!.value,
      books: this.editForm.get(['books'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAuthor>>): void {
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

  getSelected(selectedVals: IBook[], option: IBook): IBook {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
