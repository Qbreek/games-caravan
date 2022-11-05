import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { FilterState } from '../../models/filter-state.model';
import { ListOfDealsItem } from '../../models/list-of-deals-item.model';
import { ListOfDealsService } from '../../services/list-of-deals.service';

@Component({
  selector: 'app-list-of-deals-wrapper',
  templateUrl: './list-of-deals-wrapper.component.html',
  styleUrls: ['./list-of-deals-wrapper.component.scss'],
})
export class ListOfDealsWrapperComponent implements OnInit, OnDestroy {
  // TODO: add error handling
  public deals: ListOfDealsItem[] = [];
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public sortValueTemplate: string = 'Deals Rating';
  public sortOrderTemplate: string = '';
  private page = 0;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private listOfDealsService: ListOfDealsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // sub to query params change and send GET calls wherever change is detected
  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.getListOfDeals(params['sortBy'], params['desc']);
        this.sortValueTemplate = params['sortBy'] || 'Deal Rating';
        this.sortOrderTemplate =
          params['desc'] === '1' ? 'Descending' : 'Ascending';
      });
  }

  // call GET method and set loading to true so we can inform child components
  public getListOfDeals(sortBy: string, desc: string) {
    this.loading$.next(true);
    this.listOfDealsService
      .fetchListOfDeals(this.page.toString(), sortBy, desc)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.deals.push(...res);
        this.loading$.next(false);
      });
  }

  // on table sort clear the deals array and reset page, so we can make the correct call to cheapshark
  public onTableSort(value: FilterState) {
    this.deals = [];
    this.page = 0;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        sortBy: value.sortValue,
        desc: Number(value.sortOrder), // cast the boolean to a number
      },
      queryParamsHandling: 'merge',
    });
  }

  // on load more increment the page number and fetch the next page from cheapshark using the persistent url query params
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
