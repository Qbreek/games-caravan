import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() totalRecords: number = 0;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  public paginate(event: any) {
    this.pageChanged.emit(event.page);
  }
}
