import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KandidatenComponent } from './kandidaten.component';

describe('KandidatenComponent', () => {
  let component: KandidatenComponent;
  let fixture: ComponentFixture<KandidatenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KandidatenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KandidatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
