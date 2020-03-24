import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEditorial } from 'app/shared/model/editorial.model';

@Component({
  selector: 'jhi-editorial-detail',
  templateUrl: './editorial-detail.component.html'
})
export class EditorialDetailComponent implements OnInit {
  editorial: IEditorial | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ editorial }) => (this.editorial = editorial));
  }

  previousState(): void {
    window.history.back();
  }
}
