import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListOfDealsItem } from 'src/app/list-of-deals/models/list-of-deals-item.model';

@Component({
  selector: 'app-list-of-deals-table',
  templateUrl: './list-of-deals-table.component.html',
  styleUrls: ['./list-of-deals-table.component.scss'],
})
export class ListOfDealsTableComponent {
  @Input() deals: ListOfDealsItem[] = [];
  @Input() isLoading!: boolean;
  @Output() tableSorted: EventEmitter<any> = new EventEmitter();

  private filterState = {
    sortValue: '',
    sortOrder: false,
  };

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

  public onTableSort(sortValue: string) {
    this.checkFilterState(sortValue);
    this.tableSorted.emit(this.filterState);
  }

  // if the new sort value is different than the previous, reset state
  private checkFilterState(sortValue: string) {
    if (sortValue !== this.filterState.sortValue) {
      this.filterState.sortValue = sortValue;
      this.filterState.sortOrder = false;
    } else {
      this.filterState.sortOrder = !this.filterState.sortOrder;
    }
  }
}
