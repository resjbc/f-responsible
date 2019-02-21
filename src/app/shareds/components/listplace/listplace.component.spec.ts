import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListplaceComponent } from './listplace.component';

describe('ListplaceComponent', () => {
  let component: ListplaceComponent;
  let fixture: ComponentFixture<ListplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
