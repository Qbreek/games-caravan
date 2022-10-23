import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ListOfDealsItem } from '../../models/list-of-deals-item.model';
import { ListOfDealsService } from '../../services/list-of-deals.service';

@Component({
  selector: 'app-list-of-deals-wrapper',
  templateUrl: './list-of-deals-wrapper.component.html',
  styleUrls: ['./list-of-deals-wrapper.component.scss'],
})
export class ListOfDealsWrapperComponent implements OnInit, OnDestroy {
  public deals: ListOfDealsItem[] = [];
  public loading = false;
  private destroy$: Subject<void> = new Subject();
  private page = 0;
  public throttle = 0;
  public distance = 0;
  constructor(
    private listOfDealsService: ListOfDealsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.getListOfDeals(params['sortBy'], params['desc']);
      });
  }

  public getListOfDeals(sortBy?: string, desc?: number) {
    if (sortBy === 'Price') {
      this.deals = [];
      this.page = 0;
    }
    this.loading = true;
    this.listOfDealsService
      .fetchListOfDeals(this.page, sortBy, desc)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.deals.push(...res);
        this.loading = false;
      });
    this.page++;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
