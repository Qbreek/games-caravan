import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterState } from 'src/app/pages/list-of-deals/models/filter-state.model';
import { ListOfDealsItem } from 'src/app/pages/list-of-deals/models/list-of-deals-item.model';

@Component({
  selector: 'app-list-of-deals-table',
  templateUrl: './list-of-deals-table.component.html',
  styleUrls: ['./list-of-deals-table.component.scss'],
})
export class ListOfDealsTableComponent {
  @Input() deals: ListOfDealsItem[] = [];
  @Output() tableSorted: EventEmitter<any> = new EventEmitter();

  // save the state of the filters applied to the table
  private filterState: FilterState = {
    sortValue: '',
    sortOrder: false,
  };

  // use to style reviews column in table based on steam rating
  public styleReviewCol(steamRatingPercent: number) {
    if (steamRatingPercent > 69) {
      return 'steam-positive';
    } else if (steamRatingPercent <= 69 && steamRatingPercent >= 40) {
      return 'steam-mixed';
    } else if (steamRatingPercent < 40 && steamRatingPercent > 0) {
      return 'steam-negative';
    } else {
      return 'no-data';
    }
  }

  public onTableSort(newSortValue: string) {
    this.checkFilterState(newSortValue);
    this.tableSorted.emit(this.filterState);
  }

  // if the new sort value is different than the previous, reset state and emit new state to parent
  private checkFilterState(newSortValue: string) {
    if (newSortValue !== this.filterState.sortValue) {
      this.filterState.sortValue = newSortValue;
      this.filterState.sortOrder = false;
    } else {
      this.filterState.sortOrder = !this.filterState.sortOrder;
    }
  }
}
