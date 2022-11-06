import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Filters } from '../../models/filters.model';

@Component({
  selector: 'app-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss'],
})
export class TableFiltersComponent {
  @Output() filters: EventEmitter<Filters> = new EventEmitter();
  public filtersForm = new FormGroup({
    filters: new FormControl(''),
    order: new FormControl('0'),
  });

  public filtersApplied() {
    this.filters.emit(this.filtersForm.value as Filters);
  }
}
