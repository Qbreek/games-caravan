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
  private page = 0;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private listOfDealsService: ListOfDealsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.getListOfDeals(params['sortBy'], params['desc']);
      });
  }

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

  public onTableSort(value: FilterState) {
    this.deals = [];
    this.page = 0;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        sortBy: value.sortValue,
        desc: +value.sortOrder,
      },
      queryParamsHandling: 'merge',
    });
  }

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
