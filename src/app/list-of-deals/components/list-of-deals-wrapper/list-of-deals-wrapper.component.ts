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
  public totalPages: number = 0;
  public loading = false;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private listOfDealsService: ListOfDealsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.getListOfDeals(params['page'], params['sortBy'], params['desc']);
      });
  }

  private getListOfDeals(pageNumber: number, sortBy: string, desc: number) {
    this.loading = true;
    this.listOfDealsService
      .fetchListOfDeals(pageNumber, sortBy, desc)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.deals = res;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
