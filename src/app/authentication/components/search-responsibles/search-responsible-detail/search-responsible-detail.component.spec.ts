import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResponsibleDetailComponent } from './search-responsible-detail.component';

describe('SearchResponsibleDetailComponent', () => {
  let component: SearchResponsibleDetailComponent;
  let fixture: ComponentFixture<SearchResponsibleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResponsibleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResponsibleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
