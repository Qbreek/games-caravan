import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss'],
})
export class LoadMoreComponent {
  @Input() isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @Output() loadMore: EventEmitter<void> = new EventEmitter();

  public loadMoreClick() {
    this.loadMore.emit();
  }
}
