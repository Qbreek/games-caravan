import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ListOfDealsItem } from '../../models/list-of-deals-item.model';
import { ListOfDealsService } from '../../services/list-of-deals.service';

@Component({
  selector: 'app-list-of-deals-wrapper',
  templateUrl: './list-of-deals-wrapper.component.html',
  styleUrls: ['./list-of-deals-wrapper.component.scss'],
})
export class ListOfDealsWrapperComponent {
  public deals$: Observable<ListOfDealsItem[] | null> =
    this.listOfDealsService.getListOfDeals(0);
  public totalPages: number = 0;

  constructor(private listOfDealsService: ListOfDealsService) {}

  public onPageChange(page: number) {
    window.scrollTo(0, 0);
    this.deals$ = this.listOfDealsService.getListOfDeals(page);
  }
}
