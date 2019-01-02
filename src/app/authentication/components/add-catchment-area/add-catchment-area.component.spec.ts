import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatchmentAreaComponent } from './add-catchment-area.component';

describe('AddCatchmentAreaComponent', () => {
  let component: AddCatchmentAreaComponent;
  let fixture: ComponentFixture<AddCatchmentAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCatchmentAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCatchmentAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
