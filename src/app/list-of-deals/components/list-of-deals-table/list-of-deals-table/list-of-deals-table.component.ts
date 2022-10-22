import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ListOfDealsItem } from 'src/app/list-of-deals/models/list-of-deals-item.model';

@Component({
  selector: 'app-list-of-deals-table',
  templateUrl: './list-of-deals-table.component.html',
  styleUrls: ['./list-of-deals-table.component.scss'],
})
export class ListOfDealsTableComponent {
  // TODO: add error handling
  @Input() deals$!: Observable<ListOfDealsItem[] | null>;

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

  public toolTipMessage(
    steamRatingPercent: number,
    steamRatingCount: number,
    steamRatingText: string
  ) {
    if (!steamRatingText) {
      return 'We could not find any data';
    }
    return `${steamRatingPercent}% of the ${steamRatingCount} user reviews for this game are ${steamRatingText}`;
  }
}
