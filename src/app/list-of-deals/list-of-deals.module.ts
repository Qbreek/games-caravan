import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOfDealsTableComponent } from './components/list-of-deals-table/list-of-deals-table/list-of-deals-table.component';
import { ListOfDealsWrapperComponent } from './components/list-of-deals-wrapper/list-of-deals-wrapper.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListOfDealsWrapperComponent,
  },
];

@NgModule({
  declarations: [ListOfDealsTableComponent, ListOfDealsWrapperComponent],
  imports: [CommonModule, RouterModule.forChild(routes), InfiniteScrollModule],
  exports: [ListOfDealsWrapperComponent],
})
export class ListOfDealsModule {}
