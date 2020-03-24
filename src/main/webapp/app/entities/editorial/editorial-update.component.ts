import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEditorial, Editorial } from 'app/shared/model/editorial.model';
import { EditorialService } from './editorial.service';

@Component({
  selector: 'jhi-editorial-update',
  templateUrl: './editorial-update.component.html'
})
export class EditorialUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(protected editorialService: EditorialService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ editorial }) => {
      this.updateForm(editorial);
    });
  }

  updateForm(editorial: IEditorial): void {
    this.editForm.patchValue({
      id: editorial.id,
      name: editorial.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const editorial = this.createFromForm();
    if (editorial.id !== undefined) {
      this.subscribeToSaveResponse(this.editorialService.update(editorial));
    } else {
      this.subscribeToSaveResponse(this.editorialService.create(editorial));
    }
  }

  private createFromForm(): IEditorial {
    return {
      ...new Editorial(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEditorial>>): void {
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
}
