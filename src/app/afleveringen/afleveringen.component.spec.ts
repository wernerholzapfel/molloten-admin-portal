import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfleveringenComponent } from './afleveringen.component';

describe('AfleveringenComponent', () => {
  let component: AfleveringenComponent;
  let fixture: ComponentFixture<AfleveringenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfleveringenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfleveringenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
