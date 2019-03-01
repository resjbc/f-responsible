import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeadWorkComponent } from './add-head-work.component';

describe('AddHeadWorkComponent', () => {
  let component: AddHeadWorkComponent;
  let fixture: ComponentFixture<AddHeadWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHeadWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHeadWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
