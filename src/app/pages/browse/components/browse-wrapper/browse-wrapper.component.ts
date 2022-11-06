import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Filters } from '../../models/filters.model';
import { ListOfDealsItem } from '../../models/list-of-deals-item.model';
import { BrowseService } from '../../services/browse.service';

@Component({
  selector: 'app-list-of-deals-wrapper',
  templateUrl: './browse-wrapper.component.html',
  styleUrls: ['./browse-wrapper.component.scss'],
})
export class BrowseWrapperComponent implements OnInit, OnDestroy {
  // TODO: add error handling
  public deals: ListOfDealsItem[] = [];
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private page = 0;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private browseService: BrowseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // subscribing to query params, so we react on the changes and make the corresponding API calls
  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.getListOfDeals(params['sortBy'], params['desc']);
      });
  }

  // call GET method and set loading to true so we can inform child components
  public getListOfDeals(sortBy: string, desc: string) {
    this.loading$.next(true);
    this.browseService
      .fetchListOfDeals(this.page.toString(), sortBy, desc)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.deals.push(...res);
        this.loading$.next(false);
      });
  }

  // on table sort clear the current array and reset page
  public onFiltersApplied(e: Filters) {
    this.deals = [];
    this.page = 0;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        sortBy: e.filters,
        desc: e.order,
      },
      queryParamsHandling: 'merge',
    });
  }

  // on load more increment the page number and GET the next page from the API
  public onLoadMore() {
    this.page++;
    const sortBy =
      this.activatedRoute.snapshot.queryParamMap.get('sortBy') || 'Deal Rating';
    const desc = this.activatedRoute.snapshot.queryParamMap.get('desc') || '0';
    this.getListOfDeals(sortBy, desc);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
