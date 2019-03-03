import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeadWorkModalComponent } from './add-head-work-modal.component';

describe('AddHeadWorkModalComponent', () => {
  let component: AddHeadWorkModalComponent;
  let fixture: ComponentFixture<AddHeadWorkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHeadWorkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHeadWorkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
