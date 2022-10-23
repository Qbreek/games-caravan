import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListOfDealsItem } from 'src/app/list-of-deals/models/list-of-deals-item.model';
@Component({
  selector: 'app-list-of-deals-table',
  templateUrl: './list-of-deals-table.component.html',
  styleUrls: ['./list-of-deals-table.component.scss'],
})
export class ListOfDealsTableComponent {
  // TODO: add error handling
  @Input() deals: ListOfDealsItem[] = [];
  @Input() isLoading!: boolean;

  private sortOrderDescending = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

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

  public sortByPriceClick() {
    this.updateQueryParams('Price');
    this.sortOrderDescending = !this.sortOrderDescending;
  }

  // use this so the wrapper component can be informed of new requests
  private updateQueryParams(value: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        sortBy: value,
        desc: +this.sortOrderDescending,
      },
      queryParamsHandling: 'merge',
    });
  }
}
