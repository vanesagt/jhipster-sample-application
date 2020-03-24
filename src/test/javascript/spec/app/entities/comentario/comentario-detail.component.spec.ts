import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ComentarioDetailComponent } from 'app/entities/comentario/comentario-detail.component';
import { Comentario } from 'app/shared/model/comentario.model';

describe('Component Tests', () => {
  describe('Comentario Management Detail Component', () => {
    let comp: ComentarioDetailComponent;
    let fixture: ComponentFixture<ComentarioDetailComponent>;
    const route = ({ data: of({ comentario: new Comentario(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ComentarioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ComentarioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ComentarioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load comentario on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.comentario).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
