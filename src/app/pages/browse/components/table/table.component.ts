import { Component, Input } from '@angular/core';
import { ListOfDealsItem } from 'src/app/pages/browse/models/list-of-deals-item.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() deals: ListOfDealsItem[] = [];

  // used to style reviews column in table based on steam rating [ngClass]
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
}
