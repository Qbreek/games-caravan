import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoadMoreComponent } from './components/load-more-paginator/load-more.component';
import { ListOfDealsTableComponent } from './components/list-of-deals-table/list-of-deals-table/list-of-deals-table.component';
import { ListOfDealsWrapperComponent } from './components/list-of-deals-wrapper/list-of-deals-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: ListOfDealsWrapperComponent,
  },
];

@NgModule({
  declarations: [
    ListOfDealsTableComponent,
    ListOfDealsWrapperComponent,
    LoadMoreComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [ListOfDealsWrapperComponent],
})
export class ListOfDealsModule {}
