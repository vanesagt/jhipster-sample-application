import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EditorialUpdateComponent } from 'app/entities/editorial/editorial-update.component';
import { EditorialService } from 'app/entities/editorial/editorial.service';
import { Editorial } from 'app/shared/model/editorial.model';

describe('Component Tests', () => {
  describe('Editorial Management Update Component', () => {
    let comp: EditorialUpdateComponent;
    let fixture: ComponentFixture<EditorialUpdateComponent>;
    let service: EditorialService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [EditorialUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EditorialUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EditorialUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EditorialService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Editorial(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Editorial();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
