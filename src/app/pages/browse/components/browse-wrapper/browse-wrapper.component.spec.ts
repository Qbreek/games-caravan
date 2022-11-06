import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDealsWrapperComponent } from './browse-wrapper.component';

describe('ListOfDealsWrapperComponent', () => {
  let component: ListOfDealsWrapperComponent;
  let fixture: ComponentFixture<ListOfDealsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOfDealsWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfDealsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
