import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiesComponent } from './acties.component';

describe('ActiesComponent', () => {
  let component: ActiesComponent;
  let fixture: ComponentFixture<ActiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
