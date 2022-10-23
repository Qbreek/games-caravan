import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() totalRecords: number = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  public paginate(event: any) {
    this.updateQueryParams('page', event.page);
  }

  // use this so the wrapper component can be informed of new requests
  private updateQueryParams(queryName: string, value: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        [queryName]: value,
      },
      queryParamsHandling: 'merge',
    });
  }
}
