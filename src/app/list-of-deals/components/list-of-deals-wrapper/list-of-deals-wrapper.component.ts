import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
  public loading = false;
  public throttle = 0;
  public distance = 0;
  private page = 0;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private listOfDealsService: ListOfDealsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.getListOfDeals(
          params['pageNumber'],
          params['sortBy'],
          params['desc']
        );
      });
  }

  // sortBy?: string, desc?: number, pageNumber: number
  public getListOfDeals(pageNumber: number, sortBy: string, desc: number) {
    this.loading = true;
    this.listOfDealsService
      .fetchListOfDeals(pageNumber, sortBy, desc)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.deals.push(...res);
        this.loading = false;
      });
  }

  public updateQueryParams(value: any) {
    window.scrollTo(0, 0);
    this.deals = [];
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        sortBy: value.sortValue,
        desc: +value.sortOrder,
        pageNumber: 0,
      },
      queryParamsHandling: 'merge',
    });
    this.page = 0;
  }

  public paginate() {
    this.page++;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        pageNumber: this.page,
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
