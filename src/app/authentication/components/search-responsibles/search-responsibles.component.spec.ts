import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResponsiblesComponent } from './search-responsibles.component';

describe('SearchResponsiblesComponent', () => {
  let component: SearchResponsiblesComponent;
  let fixture: ComponentFixture<SearchResponsiblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResponsiblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResponsiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
