import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDealsTableComponent } from './list-of-deals-table.component';

describe('ListOfDealsTableComponent', () => {
  let component: ListOfDealsTableComponent;
  let fixture: ComponentFixture<ListOfDealsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfDealsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfDealsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
