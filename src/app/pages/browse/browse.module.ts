import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoadMoreComponent } from './components/load-more/load-more.component';
import { TableComponent } from './components/table/table.component';
import { BrowseWrapperComponent } from './components/browse-wrapper/browse-wrapper.component';
import { TableFiltersComponent } from './components/table-filters/table-filters.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: BrowseWrapperComponent,
  },
];

@NgModule({
  declarations: [
    TableComponent,
    BrowseWrapperComponent,
    LoadMoreComponent,
    TableFiltersComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [BrowseWrapperComponent],
})
export class BrowseModule {}
