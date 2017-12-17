import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestvragenComponent } from './testvragen.component';

describe('TestvragenComponent', () => {
  let component: TestvragenComponent;
  let fixture: ComponentFixture<TestvragenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestvragenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestvragenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
