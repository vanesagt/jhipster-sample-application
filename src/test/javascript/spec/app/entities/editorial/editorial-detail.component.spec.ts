import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EditorialDetailComponent } from 'app/entities/editorial/editorial-detail.component';
import { Editorial } from 'app/shared/model/editorial.model';

describe('Component Tests', () => {
  describe('Editorial Management Detail Component', () => {
    let comp: EditorialDetailComponent;
    let fixture: ComponentFixture<EditorialDetailComponent>;
    const route = ({ data: of({ editorial: new Editorial(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [EditorialDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EditorialDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EditorialDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load editorial on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.editorial).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
